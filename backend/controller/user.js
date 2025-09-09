const User = require('../model/user');
const ErrorHandler = require('../utils/ErrorHandler');
const path = require('path');
const fs = require("fs");
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const catchAsyncError = require('../middleware/catchAsyncError');
const { sendToken } = require('../utils/jwtToken');
const user = require('../model/user');

async function CreateUser(req, res, next) {
    try {
        const { name, email, password } = req.body;

        const userEmail = await User.findOne({ email: email });
        // console.log("userEmail", userEmail)

        // console.log("req.body in user", req.body)

        if (userEmail) {
            console.log("user already created")
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err)
                    res.status(500).json({ message: "Error in deleting file" })
                }
            })
            return next(new ErrorHandler("User Already exists", 409));
        }

        const fileName = req.file.filename;
        const fileUrl = path.join(fileName);

        const user = {
            name,
            email,
            password,
            avatar: {
                public_id: fileUrl,
                url: `${fileUrl}`,
            }
        }

        const activationToken = createActivationToken(user);

        const activationUrl = `http://localhost:5173/activation/${activationToken}`;

        try {
            await sendMail({
                email: email,
                subject: "Activate your account",
                message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
            });

            res.status(201).json({
                success: true,
                message: `please check your email:- ${user.email} to activate your account!`,
            });
        } catch (error) {
            console.log(error)
            return next(new ErrorHandler(error.message, 500))
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}

// create activation token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
};

// activate user
const activateUser = catchAsyncError(async (req, res, next) => {
    try {
        console.log("activation Token started...")
        const { activation_token } = req.body;

        const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
        console.log(newUser)
        if (!newUser)
            return next(new ErrorHandler("Invalid Token", 400))

        const { name, email, password, avatar } = newUser;

        let user = await User.findOne({ email });

        if (user) {
            return next(new ErrorHandler("User already exists", 409));
        }

        user = await User.create({
            name,
            password,
            email,
            avatar
        });
        console.log(user);

        sendToken(user, 201, res);


    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// Login user
const login = catchAsyncError(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return next(new ErrorHandler("Please provide all fields", 400))

        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return next(new ErrorHandler("User doesn't exists", 400));

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid)
            return next(new ErrorHandler("Invalid Password", 400));

        sendToken(user, 200, res);


    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// load User
const getUser = catchAsyncError(async (req, res, next) => {
    try {
        // console.log(req.user)
        const user = await User.findById(req.user.id)

        if (!user)
            return next(new ErrorHandler("User doesn't exists", 404));;

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
})

// logout
const logout = catchAsyncError(async (req, res, next) => {
    try {
        res.cookie("token", null, {
            maxAge: new Date(Date.now()),
            httpOnly: true
        });

        res.status(200).json({ success: true, message: " Log out Successfully" })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
})

// update user information
const updateUserInfo = catchAsyncError(async (req, res, next) => {
    try {
        const { email, password, phoneNumber, name } = req.body;

        console.log(email, password, phoneNumber, name)

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler('User not found', 400));
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid)
            return next(new ErrorHandler("Invalid Password", 400));

        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;

        await user.save();

        return res.status(200).json({ success: true, message: "User information updated successfully.", user });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
})

// update profile Image
const updateUserAvatar = catchAsyncError(async (req, res, next) => {
    try {
        const existingUser = await User.findById(req.user.id);

        const existAvatarPath = `uploads/${existingUser.avatar.url}`;

        fs.unlink(existAvatarPath, (err) => console.log("Error in deleting prev image: ", err));

        const fileName = req.file.filename;
        const fileUrl = path.join(fileName);

        const user = await User.findByIdAndUpdate(req.user.id, {
            avatar: {
                public_id: fileUrl,
                url: `${fileUrl}`,
            }
        });

        return res.status(200).json({ success: true, message: "User avatar updated successfully.", user });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
});

// update user addresses
const updateUserAddress = catchAsyncError(async (req, res, next) => {
    try {
        console.log("req.user.id: ", req.user.id);
        const user = await User.findById(req.user.id);

        const sameTypeAddress = user.addresses.find((i) => i.addressType == req.body.addressType);

        if (sameTypeAddress) {
            return next(new ErrorHandler(`${req.body.addressType} address already exists`), 400);
        }

        const existAddress = user.addresses.find((i) => i._id === req.body._id);

        if (existAddress) {
            Object.assign(existAddress, req.body);
        } else {
            // add the new Address
            user.addresses.push(req.body);
        }

        await user.save();

        return res.status(200).json({ success: true, user });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// delete user addresses
const deleteUserAddress = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.user._id;
        const addressId = req.params.id;

        await User.updateOne(
            {
                _id: userId,
            },
            { $pull: { addresses: { _id: addressId } } }
        );

        const user = await User.findById(userId);

        res.status(200).json({ success: true, user });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// update user password
const updatePassword = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("+password");

        const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

        if (!isPasswordMatch)
            return next(new ErrorHandler("Old Password is incorrect", 400));

        if (req.body.newPassword !== req.body.confirmPassword)
            return next(new ErrorHandler("Password doesn't Matched with each other!", 400));

        user.password = req.body.newPassword;

        await user.save();

        res.status(200).json({ success: true, message: "Password updated successfully!" });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

const getUserInfo = catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        res.status(201).json({
            success: true,
            user,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

module.exports = {
    CreateUser,
    activateUser,
    login,
    getUser,
    logout,
    updateUserInfo,
    updateUserAvatar,
    updateUserAddress,
    deleteUserAddress,
    updatePassword,
    getUserInfo
}
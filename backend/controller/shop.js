const Shop = require('../model/shop');
const ErrorHandler = require('../utils/ErrorHandler');
const path = require('path');
const fs = require("fs");
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const catchAsyncError = require('../middleware/catchAsyncError');
const { sendShopToken } = require('../utils/jwtToken');

// create shop
async function CreateShop(req, res, next) {
    try {
        const { email } = req.body;

        const sellerEmail = await Shop.findOne({ email: email });
        console.log("sellerEmail", sellerEmail)

        console.log("req.body in shop", req.body)

        if (sellerEmail) {
            console.log("shop already created")
            const filename = req.file.filename;

            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err)
                    res.status(500).json({ message: "Error in deleting file" })
                }
            })
            return next(new ErrorHandler("Shop Already exists", 409));
        }

        console.log(req.file)
        const fileName = req.file.filename;
        const fileUrl = path.join(fileName);

        const { name, password, address, phoneNumber, zipCode, } = req.body;

        const seller = {
            name,
            email,
            password,
            avatar: {
                public_id: fileName,
                url: fileName,
            },
            address,
            phoneNumber,
            zipCode
        }

        const activationToken = createActivationToken(seller);

        const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;

        try {
            await sendMail({
                email: email,
                subject: "Activate your shop",
                message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
            });

            res.status(201).json({
                success: true,
                message: `please check your email:- ${seller.email} to activate your shop!`,
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
const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
};

// activate seller
const activateSeller = catchAsyncError(async (req, res, next) => {
    try {
        console.log("activation Token started...")
        const { activation_token } = req.body;
        console.log("req.body", req.body)
        console.log(activation_token)
        const newSeller = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
        console.log(newSeller)
        if (!newSeller)
            return next(new ErrorHandler("Invalid Token", 400))

        const { name, email, password, address, phoneNumber, zipCode, avatar } = newSeller;

        let seller = await Shop.findOne({ email });

        if (seller) {
            return next(new ErrorHandler("Shop already exists", 409));
        }

        seller = await Shop.create({
            name,
            email,
            password,
            avatar,
            address,
            phoneNumber,
            zipCode
        });
        console.log(seller);

        sendShopToken(seller, 201, res);


    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
})

// login shop
const loginShop = catchAsyncError(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        if (!email || !password)
            return next(new ErrorHandler("Please provide all fields", 400))

        const seller = await Shop.findOne({ email }).select('+password');
        console.log(seller)

        if (!seller)
            return next(new ErrorHandler("Shop doesn't exists", 400));
        console.log(await seller.comparePassword(password))
        const isPasswordValid = await seller.comparePassword(password);
        if (!isPasswordValid)
            return next(new ErrorHandler("Invalid Password", 400));

        sendShopToken(seller, 200, res);


    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})


// load Shop
const getShop = catchAsyncError(async (req, res, next) => {
    try {
        console.log(req.seller)
        const shop = await Shop.findById(req.seller.id)

        if (!shop)
            return next(new ErrorHandler("Shop doesn't exists", 404));

        res.status(200).json({
            success: true,
            shop
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
})

// logout
const logout = catchAsyncError(async (req, res, next) => {
    try {
        res.cookie("seller_token", null, {
            maxAge: new Date(Date.now()),
            httpOnly: true
        });

        res.status(200).json({ success: true, message: " Log out Successfully" })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
})

// get shop info
const getShopInfo = catchAsyncError(async (req, res, next) => {
    try {
        const shop = await Shop.findById(req.params.id);
        res.status(201).json({
            success: true,
            shop,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

//update seller info
const updateSellerInfo = catchAsyncError(async (req, res, next) => {
    try {
        const { name, description, address, phoneNumber, zipCode } = req.body;

        const shop = await Shop.findOne(req.seller._id);

        if (!shop) {
            return next(new ErrorHandler("Shop not found", 400));
        }

        shop.name = name;
        shop.description = description;
        shop.address = address;
        shop.phoneNumber = phoneNumber;
        shop.zipCode = zipCode;

        await shop.save();

        res.status(201).json({
            success: true,
            shop,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// update seller avatar
const updateSellerAvatar = catchAsyncError(async (req, res, next) => {
    try {
        const existingShop = await Shop.findById(req.seller.id);

        const existAvatarPath = `uploads/${existingShop.avatar.url}`;

        fs.unlink(existAvatarPath, (err) => console.log("Error in deleting prev image: ", err));

        const fileName = req.file.filename;
        const fileUrl = path.join(fileName);

        const seller = await Shop.findByIdAndUpdate(req.seller.id, {
            avatar: {
                public_id: fileUrl,
                url: `${fileUrl}`,
            }
        });

        return res.status(200).json({ success: true, message: "Shop avatar updated successfully.", seller });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
});

module.exports = {
    CreateShop,
    activateSeller,
    loginShop,
    getShop,
    logout,
    getShopInfo,
    updateSellerInfo,
    updateSellerAvatar
}
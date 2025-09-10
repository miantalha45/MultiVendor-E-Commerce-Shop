const ErrorHandler = require('../utils/ErrorHandler');
const jwt = require('jsonwebtoken');
const catchAsyncError = require('./catchAsyncError')
const User = require('../model/user')
const Shop = require('../model/shop')

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {};

    const user = await User.findById(decode.id);
    if (user)
        req.user = user

    next();
})

exports.isSeller = catchAsyncError(async (req, res, next) => {
    const { seller_token } = req.cookies;

    if (!seller_token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decode = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
    req.seller = {};

    const shop = await Shop.findById(decode.id);
    if (shop)
        req.seller = shop

    next();
});

exports.isAdmin = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} can not access this resources!`))
        };
        next();
    }
}
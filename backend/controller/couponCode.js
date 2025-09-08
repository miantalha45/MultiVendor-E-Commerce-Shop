const CouponCode = require('../model/couponCode');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const Shop = require('../model/shop');

// create coupon code
const createCoupon = catchAsyncError(async (req, res, next) => {
    try {
        const isCouponCodeExists = await CouponCode.find({
            name: req.body.name,
        });

        console.log(isCouponCodeExists.length !== 0)

        if (isCouponCodeExists.length !== 0) {
            return next(new ErrorHandler("Coupon code already exists!", 400));
        }

        const couponCode = await CouponCode.create(req.body);

        res.status(201).json({
            success: true,
            couponCode,
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})

// get all events
const getAllCouponCodes = catchAsyncError(async (req, res, next) => {
    console.log('get coupons hit')
    try {
        const codes = await CouponCode.find({ shopId: req.params.id });
        res.status(200).json({ success: true, codes })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))

    }
})

// delete coupon
const deleteCouponCode = catchAsyncError(async (req, res, next) => {
    // console.log('delete coupons hit')
    try {
        const code = await CouponCode.findById(req.params.id);

        if (!code) {
            return next(new ErrorHandler("Coupon code not found with this id!", 404))
        }

        await CouponCode.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, code, message: "Coupon Code delete successfully!" })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))

    }
})

// get coupon code value by its name
const getCouponByName = catchAsyncError(async (req, res, next) => {
    try {
        const couponCode = await CouponCode.findOne({ name: req.params.name });

        res.status(200).json({
            success: true,
            couponCode,
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})

module.exports = {
    createCoupon,
    getAllCouponCodes,
    deleteCouponCode,
    getCouponByName
}
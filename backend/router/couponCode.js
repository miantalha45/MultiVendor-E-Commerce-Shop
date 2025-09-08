const express = require('express');
const { isSeller } = require('../middleware/auth');
const { createCoupon, getAllCouponCodes, deleteCouponCode, getCouponByName } = require('../controller/couponCode');

const router = express.Router();

router.post("/create-coupon-code", isSeller, createCoupon);
router.get("/get-coupon/:id", isSeller, getAllCouponCodes);
router.delete("/delete-coupon/:id", isSeller, deleteCouponCode);
router.get("/get-coupon-value/:name", getCouponByName);

module.exports = router;
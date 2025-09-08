const express = require('express');
const { createOrder, getUserAllOrders, getSellerAllOrders, updateOrderStatus, refundOrder, orderRefundSuccess } = require('../controller/order');
const { isAuthenticated, isSeller } = require('../middleware/auth');

const router = express.Router();

router.post('/create-order', isAuthenticated, createOrder);
router.get('/get-all-orders/:userId', isAuthenticated, getUserAllOrders);
router.get('/get-seller-all-orders/:shopId', getSellerAllOrders);
router.put('/update-order-status/:id', isSeller, updateOrderStatus);
router.put("/order-refund/:id", isAuthenticated, refundOrder);
router.put("/order-refund-success/:id", isSeller, orderRefundSuccess)

module.exports = router;
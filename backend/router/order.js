const express = require('express');
const { createOrder, getUserAllOrders, getSellerAllOrders, updateOrderStatus } = require('../controller/order');
const { isAuthenticated, isSeller } = require('../middleware/auth');

const router = express.Router();

router.post('/create-order', isAuthenticated, createOrder);
router.get('/get-all-orders/:userId', isAuthenticated, getUserAllOrders);
router.get('/get-seller-all-orders/:shopId', getSellerAllOrders);
router.put('/update-order-status/:id', isSeller, updateOrderStatus);

module.exports = router;
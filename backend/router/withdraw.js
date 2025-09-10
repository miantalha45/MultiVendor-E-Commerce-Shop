const express = require('express');
const { isSeller, isAdmin, isAuthenticated } = require('../middleware/auth');
const { createWithdraw, getAllwithdrawRequests, updateWithdrawRequest } = require('../controller/withdraw');
const router = express.Router();

router.post('/create-withdraw-request', isSeller, createWithdraw);
router.get("/get-all-withdraw-request", isAuthenticated, isAdmin("Admin"), getAllwithdrawRequests);
router.put("/update-withdraw-request/:id", isAuthenticated, isAdmin("Admin"), updateWithdrawRequest);

module.exports = router;
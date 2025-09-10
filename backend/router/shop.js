const express = require('express');
const { upload } = require('../multer');
const { CreateShop, activateSeller, loginShop, getShop, logout, getShopInfo, updateSellerInfo, updateSellerAvatar, getAllSellers, deleteSeller, updatePaymentMethod, deletePaymentMethod } = require('../controller/shop');
const { isSeller, isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/create-shop', upload.single("file"), CreateShop);
router.post('/activation', activateSeller);
router.post('/login-shop', loginShop);
router.get('/getSeller', isSeller, getShop);
router.get('/logout', isSeller, logout);
router.get("/get-shop-info/:id", getShopInfo);
router.put("/update-seller-info", isSeller, updateSellerInfo);
router.put("/update-shop-avatar", isSeller, upload.single("image"), updateSellerAvatar);
router.put("/update-payment-methods", isSeller, updatePaymentMethod);
router.delete("/delete-withdraw-method/", isSeller, deletePaymentMethod);
router.get("/admin-all-sellers", isAuthenticated, isAdmin("Admin"), getAllSellers);
router.delete("/delete-seller/:id", isAuthenticated, isAdmin("Admin"), deleteSeller);


module.exports = router;
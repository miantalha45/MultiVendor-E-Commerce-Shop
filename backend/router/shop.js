const express = require('express');
const { upload } = require('../multer');
const { CreateShop, activateSeller, loginShop, getShop, logout, getShopInfo, updateSellerInfo, updateSellerAvatar } = require('../controller/shop');
const { isSeller } = require('../middleware/auth');

const router = express.Router();

router.post('/create-shop', upload.single("file"), CreateShop);
router.post('/activation', activateSeller);
router.post('/login-shop', loginShop);
router.get('/getSeller', isSeller, getShop);
router.get('/logout', isSeller, logout);
router.get("/get-shop-info/:id", getShopInfo);
router.put("/update-seller-info", isSeller, updateSellerInfo);
router.put("/update-shop-avatar", isSeller, upload.single("image"), updateSellerAvatar);


module.exports = router;
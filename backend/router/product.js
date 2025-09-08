const express = require('express');
const { upload } = require('../multer');
const { CreateProduct, getAllShopProducts, deleteProduct, getAllProducts, createNewReview } = require('../controller/product');
const { isSeller, isAuthenticated } = require('../middleware/auth')

const router = express.Router();

//create product
router.post('/create-product', upload.array("images"), CreateProduct);
router.get('/get-all-products', getAllProducts);
router.get('/get-all-products-shop/:id', getAllShopProducts);
router.delete('/delete-product-shop/:id', isSeller, deleteProduct);
router.put("/create-new-review", isAuthenticated, createNewReview);

module.exports = router;
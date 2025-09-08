const express = require('express');
const { upload } = require('../multer');
const { CreateProduct, getAllShopProducts, deleteProduct, getAllProducts } = require('../controller/product');
const { isSeller } = require('../middleware/auth')

const router = express.Router();

//create product
router.post('/create-product', upload.array("images"), CreateProduct);
router.get('/get-all-products', getAllProducts);
router.get('/get-all-products-shop/:id', getAllShopProducts);
router.delete('/delete-product-shop/:id', isSeller, deleteProduct);

module.exports = router;
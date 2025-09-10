const express = require('express');
const { upload } = require('../multer');
const { CreateProduct, getAllShopProducts, deleteProduct, getAllProducts, createNewReview, getAllProductsForAdmin } = require('../controller/product');
const { isSeller, isAuthenticated, isAdmin } = require('../middleware/auth')

const router = express.Router();

//create product
router.post('/create-product', upload.array("images"), CreateProduct);
router.get('/get-all-products', getAllProducts);
router.get('/get-all-products-shop/:id', getAllShopProducts);
router.delete('/delete-product-shop/:id', isSeller, deleteProduct);
router.put("/create-new-review", isAuthenticated, createNewReview);
router.get("/admin-all-products", isAuthenticated, isAdmin("Admin"), getAllProductsForAdmin)

module.exports = router;
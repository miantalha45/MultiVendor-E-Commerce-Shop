const Product = require('../model/product');
const Order = require('../model/order');
const Shop = require('../model/shop');
const ErrorHandler = require('../utils/ErrorHandler');
const fs = require("fs");
const catchAsyncError = require('../middleware/catchAsyncError');

// create product
const CreateProduct = catchAsyncError(async (req, res, next) => {
    try {
        console.log("create product hitted..->")
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if (!shop)
            return next(new ErrorHandler("Shop Id is invalid", 400));

        console.log('req.files: ', req.files)
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);

        console.log("image url: ", imageUrls)
        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;

        const product = await Product.create(productData);

        return res.status(201).json({ success: true, message: "Product created successfully!", product })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// get all products
const getAllProducts = catchAsyncError(async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });;
        res.status(200).json({ success: true, products })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))

    }
})

// get all shop products
const getAllShopProducts = catchAsyncError(async (req, res, next) => {
    try {
        const products = await Product.find({ shopId: req.params.id });
        res.status(200).json({ success: true, products })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))

    }
})

// delete product
const deleteProduct = catchAsyncError(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found with this id!", 404));
        }

        for (const imageUrl of product.images) {
            const filePath = `uploads/${imageUrl}`;
            try {
                await fs.promises.unlink(filePath);
            } catch (err) {
                console.error(`Error deleting file ${filePath}:`, err.message);
            }
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

const createNewReview = catchAsyncError(async (req, res, next) => {
    try {
        const { user, rating, comment, productId, orderId } = req.body;

        const product = await Product.findById(productId);

        const review = {
            user,
            rating,
            comment,
            productId,
        };

        const isReviewed = product.reviews.find(
            (rev) => rev.user._id === req.user._id
        );

        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.user._id === req.user._id) {
                    (rev.rating = rating), (rev.comment = comment), (rev.user = user);
                }
            });
        } else {
            product.reviews.push(review);
        }

        let avg = 0;

        product.reviews.forEach((rev) => {
            avg += rev.rating;
        });

        product.ratings = avg / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        await Order.findByIdAndUpdate(orderId, { $set: { "cart.$[elem].isReviewed": true } }, { arrayFilters: [{ "elem._id": productId }], new: true });

        res.status(200).json({
            success: true,
            message: "Reviwed succesfully!",
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})


module.exports = {
    CreateProduct,
    getAllShopProducts,
    deleteProduct,
    getAllProducts,
    createNewReview
}
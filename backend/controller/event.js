const Event = require('../model/event');
const Shop = require('../model/shop');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const fs = require('fs');
const cloudinary = require("cloudinary");

// create event
const CreateEvent = catchAsyncError(async (req, res, next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return next(new ErrorHandler("Shop Id is invalid!", 400));
        } else {
            let images = [];

            if (typeof req.body.images === "string") {
                images.push(req.body.images);
            } else {
                images = req.body.images;
            }

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }

            const productData = req.body;
            productData.images = imagesLinks;
            productData.shop = shop;

            const event = await Event.create(productData);

            res.status(201).json({
                success: true,
                event,
            });
        }
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})

// get all events shop
const getAllShopEvents = catchAsyncError(async (req, res, next) => {
    try {
        const events = await Event.find({ shopId: req.params.id });
        res.status(200).json({ success: true, events })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))

    }
})

// delete event
const deleteEvent = catchAsyncError(async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product is not found with this id", 404));
        }

        for (let i = 0; 1 < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(
                event.images[i].public_id
            );
        }

        await event.remove();

        res.status(201).json({
            success: true,
            message: "Event Deleted successfully!",
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})

// get all events
const getAllEvents = catchAsyncError(async (req, res, next) => {
    try {
        const events = await Event.find();
        res.status(200).json({ success: true, events })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))

    }
});

const getAllEventsForAdmin = catchAsyncError(async (req, res, next) => {
    try {
        const events = await Event.find().sort({
            createdAt: -1,
        });
        res.status(201).json({
            success: true,
            events,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

module.exports = {
    CreateEvent,
    deleteEvent,
    getAllEvents,
    getAllShopEvents,
    getAllEventsForAdmin,
    deleteEvent
}
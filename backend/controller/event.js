const Event = require('../model/event');
const Shop = require('../model/shop');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const fs = require('fs');

// create event
const CreateEvent = catchAsyncError(async (req, res, next) => {
    try {
        console.log("create event hitted..->")
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if (!shop)
            return next(new ErrorHandler("Shop Id is invalid", 400));

        console.log('req.files: ', req.files)
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);

        console.log("image url: ", imageUrls)
        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.shop = shop;

        const event = await Event.create(eventData);

        return res.status(201).json({ success: true, message: "Event created successfully!", event })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
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

        if (!event) {
            return next(new ErrorHandler("Event not found with this id!", 404))
        }

        for (const imageUrl of event.images) {
            const filePath = `uploads/${imageUrl}`;
            try {
                await fs.promises.unlink(filePath);
            } catch (err) {
                console.error(`Error deleting file ${filePath}:`, err.message);
            }
        }

        await Event.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, event, message: "Event delete successfully!" })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))

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
})

module.exports = {
    CreateEvent,
    deleteEvent,
    getAllEvents,
    getAllShopEvents
}
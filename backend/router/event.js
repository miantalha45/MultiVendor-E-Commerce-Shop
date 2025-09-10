const express = require('express');
const { upload } = require('../multer');
const { CreateEvent, getAllEvents, deleteEvent, getAllShopEvents, getAllEventsForAdmin } = require('../controller/event');
const { isSeller, isAdmin, isAuthenticated } = require('../middleware/auth')

const router = express.Router();

//create product
router.post('/create-event', upload.array("images"), CreateEvent);
router.get('/get-all-event-shop/:id', getAllShopEvents);
router.delete('/delete-shop-event/:id', deleteEvent);
router.get("/get-all-events", getAllEvents);
router.get("/admin-all-events", isAuthenticated, isAdmin("Admin"), getAllEventsForAdmin);

module.exports = router;
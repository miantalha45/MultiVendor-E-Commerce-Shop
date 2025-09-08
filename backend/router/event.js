const express = require('express');
const { upload } = require('../multer');
const { CreateEvent, getAllEvents, deleteEvent, getAllShopEvents } = require('../controller/event');
const { isSeller } = require('../middleware/auth')

const router = express.Router();

//create product
router.post('/create-event', upload.array("images"), CreateEvent);
router.get('/get-all-event-shop/:id', getAllShopEvents);
router.delete('/delete-event-shop/:id', isSeller, deleteEvent);
router.get("/get-all-events", getAllEvents);

module.exports = router;
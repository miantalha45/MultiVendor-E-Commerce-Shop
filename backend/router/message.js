const express = require('express');
const { createNewMessage, getAllMessages } = require('../controller/message');
const { upload } = require('../multer');

const router = express.Router();

router.post("/create-new-message", upload.array("images"), createNewMessage)
router.get("/get-all-messages/:id", getAllMessages)

module.exports = router;
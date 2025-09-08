const express = require('express');
const { createNewMessage } = require('../controller/message');
const { upload } = require('../multer');

const router = express.Router();

router.post("/create-new-message", upload.array("images"), createNewMessage)

module.exports = router;
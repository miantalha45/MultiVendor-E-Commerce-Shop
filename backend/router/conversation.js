const express = require('express');
const { createNewConversation, getAllSellerConversations } = require('../controller/conversation');
const { isSeller } = require('../middleware/auth');

const router = express.Router();

router.post("/create-new-conversation", createNewConversation);
router.get("/get-all-conversation-seller/:id", isSeller, getAllSellerConversations);

module.exports = router;
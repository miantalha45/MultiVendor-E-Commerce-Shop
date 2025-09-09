const express = require('express');
const { createNewConversation, getAllSellerConversations, updateLastMessage, getAllUserConversations } = require('../controller/conversation');
const { isSeller, isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post("/create-new-conversation", createNewConversation);
router.get("/get-all-conversation-seller/:id", isSeller, getAllSellerConversations);
router.put("/update-last-message/:id", updateLastMessage);
router.get("/get-all-conversation-user/:id", isAuthenticated, getAllUserConversations)

module.exports = router;
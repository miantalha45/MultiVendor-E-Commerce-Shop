const Conversation = require('../model/conversation');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/ErrorHandler')

// create a new conversation
const createNewConversation = catchAsyncError(async (req, res, next) => {
    try {
        const { groupTitle, userId, sellerId } = req.body;

        const isConversationExist = await Conversation.findOne({ groupTitle });

        if (isConversationExist) {
            const conversation = isConversationExist;
            return res.status(200).json({
                success: true,
                conversation,
            });
        } else {
            const conversation = await Conversation.create({
                members: [userId, sellerId],
                groupTitle: groupTitle,
            });

            return res.status(201).json({
                success: true,
                conversation,
            });
        }
    } catch (error) {
        return next(new ErrorHandler(error.response.message), 500);
    }
});

const getAllSellerConversations = catchAsyncError(async (req, res, next) => {
    try {
        const conversations = await Conversation.find({
            members: {
                $in: [req.params.id],
            },
        }).sort({ updatedAt: -1, createdAt: -1 });

        res.status(201).json({
            success: true,
            conversations,
        });
    } catch (error) {
        return next(new ErrorHandler(error), 500);
    }
});

const updateLastMessage = catchAsyncError(async (req, res, next) => {
    try {
        const { lastMessage, lastMessageId } = req.body;

        const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
            lastMessage,
            lastMessageId,
        }, { new: true });

        res.status(201).json({
            success: true,
            conversation,
        });
    } catch (error) {
        return next(new ErrorHandler(error), 500);
    }
});

const getAllUserConversations = catchAsyncError(async (req, res, next) => {
    try {
        const conversations = await Conversation.find({
            members: {
                $in: [req.params.id],
            },
        }).sort({ updatedAt: -1, createdAt: -1 });

        res.status(201).json({
            success: true,
            conversations,
        });
    } catch (error) {
        return next(new ErrorHandler(error), 500);
    }
});

module.exports = {
    createNewConversation,
    getAllSellerConversations,
    updateLastMessage,
    getAllUserConversations
}
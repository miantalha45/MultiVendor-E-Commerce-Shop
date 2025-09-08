const express = require('express');
const { upload } = require('../multer');
const { CreateUser, activateUser, login, getUser, logout, updateUserInfo, updateUserAvatar, updateUserAddress, deleteUserAddress, updatePassword } = require('../controller/user');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/create-user', upload.single("file"), CreateUser);
router.post('/activation', activateUser);
router.post('/login-user', login);
router.get('/getUser', isAuthenticated, getUser);
router.get('/logout', isAuthenticated, logout);
router.put('/update-user-info', isAuthenticated, updateUserInfo);
router.put('/update-avatar', isAuthenticated, upload.single("image"), updateUserAvatar);
router.put('/update-user-addresses', isAuthenticated, updateUserAddress);
router.delete('/delete-user-address/:id', isAuthenticated, deleteUserAddress);
router.put('/update-password', isAuthenticated, updatePassword);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.post(
  '/login',
  userController.login,
  authMiddleware,
  userController.getUserDetails
);
router.post('/register', userController.register);
router.get('/logout', userController.logout);
router.get('/userInfo', authMiddleware, userController.getUserDetails);
router.patch('/favorite', authMiddleware, userController.updateFavorites);
module.exports = router;

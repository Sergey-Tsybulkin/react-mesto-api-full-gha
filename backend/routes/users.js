const router = require('express').Router();

const {
  updateUserProfileValidation,
  updateUserAvatarValidation,
  getUserIdValidation,
} = require('../validations/usersValidation');

const {
  getUsers,
  getUserId,
  getCurrentUserInfo,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers); // Finding all users
router.get('/me', getCurrentUserInfo); // Finding a user
router.get('/:id', getUserIdValidation, getUserId); // Finding a user by _id
router.patch('/me', updateUserProfileValidation, updateUserProfile); // Profile update
router.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar); // Avatar update

module.exports = router;

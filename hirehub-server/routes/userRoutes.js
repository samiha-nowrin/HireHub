const router = require('express').Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);

module.exports = router;
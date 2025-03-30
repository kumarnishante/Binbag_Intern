const express = require('express');
const asyncHandler = require('express-async-handler');
const authenticateUser = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/profileController');

const router = express.Router();

router.use(authenticateUser);

router.get('/', asyncHandler(getProfile));
router.patch('/', asyncHandler(updateProfile));

module.exports = router;
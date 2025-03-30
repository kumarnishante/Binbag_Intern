const express = require('express');
const asyncHandler = require('express-async-handler');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));

module.exports = router;
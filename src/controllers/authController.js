const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { CustomError } = require('../utils/errors');
const { registerSchema, loginSchema } = require('../schemas/authSchema');

const register = async (req, res) => {
  const validatedData = registerSchema.parse(req.body);
  
  const existingUser = await User.findOne({ email: validatedData.email });
  if (existingUser) {
    throw new CustomError('Email already exists', StatusCodes.CONFLICT);
  }

  const user = await User.create(validatedData);
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

  res.status(StatusCodes.CREATED).json({
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

const login = async (req, res) => {
  const validatedData = loginSchema.parse(req.body);
  
  const user = await User.findOne({ email: validatedData.email });
  if (!user || !(await user.comparePassword(validatedData.password))) {
    throw new CustomError('Invalid credentials', StatusCodes.UNAUTHORIZED);
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

  res.status(StatusCodes.OK).json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

module.exports = {
  register,
  login
};
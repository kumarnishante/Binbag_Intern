const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel');
const { CustomError } = require('../utils/errors');
const { updateProfileSchema } = require('../schemas/profileSchema');

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) {
    throw new CustomError('User not found', StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({
    message: 'Profile retrieved successfully',
    user
  });
};

const updateProfile = async (req, res) => {
  const validatedData = updateProfileSchema.parse(req.body);
  
  // If password is being updated, we need to handle it separately
  // because of the pre-save middleware in the User model
  if (validatedData.password) {
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new CustomError('User not found', StatusCodes.NOT_FOUND);
    }
    user.password = validatedData.password;
    await user.save();
    
    // Remove password from validatedData to prevent double-hashing
    delete validatedData.password;
  }

  // Update other fields if any
  if (Object.keys(validatedData).length > 0) {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      validatedData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new CustomError('User not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({
      message: 'Profile updated successfully',
      user
    });
  } else {
    // If only password was updated, fetch and return the updated user
    const user = await User.findById(req.user.userId).select('-password');
    res.status(StatusCodes.OK).json({
      message: 'Profile updated successfully',
      user
    });
  }
};

module.exports = {
  getProfile,
  updateProfile
};
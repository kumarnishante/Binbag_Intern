const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../utils/errors');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError('Authentication invalid', StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    throw new CustomError('Authentication invalid', StatusCodes.UNAUTHORIZED);
  }
};

module.exports = authenticateUser;
const { StatusCodes } = require('http-status-codes');
const { ZodError } = require('zod');
const logger = require('../utils/logger');
const { CustomError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  if (err instanceof ZodError) {
    const errors = err.errors.map(error => ({
      field: error.path.join('.'),
      message: error.message
    }));

    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Validation error',
      details: errors
    });
  }

  if (err.name === 'ValidationError') {
    const errors = Object.keys(err.errors).map(field => ({
      field,
      message: err.errors[field].message
    }));

    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Validation error',
      details: errors
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(StatusCodes.CONFLICT).json({
      error: `${field} already exists`
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'Something went wrong'
  });
};

module.exports = errorHandler;
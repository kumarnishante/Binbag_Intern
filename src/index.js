const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(StatusCodes.OK).json({ status: 'OK' });
});

// Error handling
app.use(errorHandler);

// Handle unknown routes (404)
app.use((req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
  });
});


// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const dbName = mongoose.connection.name;
    logger.info(`Connected to MongoDB - Database: ${dbName}`);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error(`MongoDB connection error:', ${error.message}`);
    process.exit(1);
  });
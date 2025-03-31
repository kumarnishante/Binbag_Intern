# User Profile Management API

A RESTful API for managing user profiles with JWT authentication.

## Features

- User registration and authentication
- Profile management (create, retrieve, update)
- JWT-based authentication
- Input validation using Zod
- Error handling and logging
- MongoDB integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/user-profile-api
   JWT_SECRET=your-super-secret-jwt-key
   PORT=3000
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Documentation

For detailed API documentation and testing, visit the Postman documentation:
[User Profile Management API - Postman](https://documenter.getpostman.com/view/42804519/2sB2cRCPSQ)

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/auth/register`
- Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "address": "123 Main St",
    "bio": "Software Developer",
    "profilePicture": "https://example.com/picture.jpg"
  }
  ```

#### Login
- **POST** `/api/auth/login`
- Body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Profile Management

#### Get Profile
- **GET** `/api/profile`
- Headers:
  ```
  Authorization: Bearer <token>
  ```

#### Update Profile
- **PATCH** `/api/profile`
- Headers:
  ```
  Authorization: Bearer <token>
  ```
- Body:
  ```json
  {
    "name": "John Doe Updated",
    "address": "456 New St",
    "bio": "Senior Software Developer",
    "profilePicture": "https://example.com/new-picture.jpg"
  }
  ```


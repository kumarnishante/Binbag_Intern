const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').nonempty('Name is required'),
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
  address: z.string().min(5, 'Address must be at least 5 characters').nonempty('Address is required'),
  bio: z.string().optional(),
  profilePicture: z.string().url('Profile picture must be a valid URL').optional()
}).strict();

const loginSchema = z.object({
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required')
}).strict();

module.exports = {
  registerSchema,
  loginSchema
};
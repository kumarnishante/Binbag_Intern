const { z } = require('zod');

const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  address: z.string().min(5, 'Address must be at least 5 characters').optional(),
  bio: z.string().optional(),
  profilePicture: z.string().url('Profile picture must be a valid URL').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional()
}).strict();

module.exports = {
  updateProfileSchema
};
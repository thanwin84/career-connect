import mongoose from 'mongoose';
import { UserRoles } from '../constants';
import { permissions } from '../constants/permissions';

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: Object.values(UserRoles),
    required: true,
    trim: true,
    lowercase: true,
  },
  permissions: {
    type: [String],
    enum: Object.values(permissions),
  },
});

export const Role = mongoose.model('role', roleSchema);

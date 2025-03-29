import mongoose, { InferSchemaType } from 'mongoose';

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  permissions: {
    type: [String],
  },
});

export const Role = mongoose.model('Role', roleSchema);

export type RoleType = InferSchemaType<typeof roleSchema>;

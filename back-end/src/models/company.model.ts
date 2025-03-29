import mongoose from 'mongoose';
import { locationSchema } from './location.model';
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: String,
  location: locationSchema,
  role: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export const Company = mongoose.model('Company', companySchema);

import mongoose from 'mongoose';

export const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  detailsAdress: String,
});

export const Location = mongoose.model('Location', locationSchema);

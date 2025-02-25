import mongoose, { InferSchemaType } from 'mongoose';
import { NotificationTypes } from '../utils/constants';

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      enum: Object.values(NotificationTypes),
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ['read', 'unread'],
      default: 'unread',
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model('Notification', notificationSchema);
export type Notification = InferSchemaType<typeof notificationSchema>;

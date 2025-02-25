import mongoose from 'mongoose';
import { Notification } from '../models/notification.model';
import { Pagination } from '../types';
import { ApiResponse } from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler';
import { statusCodes } from '../utils/constants';

export const getAllNotification = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const notifications = await Notification.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(req.user.userId) },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);
  const total = await Notification.countDocuments({ userId: req.user.userId });
  const pagination: Pagination = {
    totalItems: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
  res
    .status(statusCodes.OK)
    .json(new ApiResponse(statusCodes.OK, { notifications, pagination }));
});

export const getUnreadNotificationsCount = asyncHandler(async (req, res) => {
  const unreadCount = await Notification.countDocuments({
    userId: req.user.userId,
    status: 'unread',
  });
  res
    .status(200)
    .json(
      new ApiResponse(
        statusCodes.OK,
        { unreadCount },
        'Unread notification count is fetched successfully'
      )
    );
});
export const markAsRead = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const result = await Notification.updateMany(
    { userId: userId, status: 'unread' },
    { $set: { status: 'read' } }
  );
  console.log(userId);
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(
        statusCodes.OK,
        {},
        'Notification is marked as read successfully'
      )
    );
});

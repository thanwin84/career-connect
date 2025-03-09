import { Queue } from 'bullmq';
import { redisConnectionConfig } from '../../config/redisConnection.config';

export const deleteAccountQueue = new Queue('deleteAccount', {
  connection: redisConnectionConfig,
});

export const scheduleDeleteAccountJob = (userId: string) => {
  deleteAccountQueue.add('deleteAccount', { userId }, { delay: 2 * 60 * 1000 });
};

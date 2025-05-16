import { Worker } from 'bullmq';
import { deleteAccountTask } from './accountDeletionService';
import { redisConnectionConfig } from '../../config/redisConnection.config';

export const deleteAccountWorker = new Worker(
  'deleteAccount',
  async (job) => {
    const { userId } = job.data;
    await deleteAccountTask(userId);
  },
  {
    connection: redisConnectionConfig,
  }
);

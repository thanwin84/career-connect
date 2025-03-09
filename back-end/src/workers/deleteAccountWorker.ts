import { Worker } from 'bullmq';
import { deleteAccountTask } from '../service/tasks/user.task';

export const deleteAccountWorker = new Worker(
  'deleteAccount',
  async (job) => {
    const { userId } = job.data;
    await deleteAccountTask(userId);
  },
  {
    connection: {
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      host: process.env.REDIS_HOST,
      port: 12624,
    },
  }
);

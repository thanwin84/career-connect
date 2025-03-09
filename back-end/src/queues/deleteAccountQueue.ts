import { Queue } from 'bullmq';

export const deleteAccountQueue = new Queue('deleteAccount', {
  connection: {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: 12624,
  },
});

export const scheduleDeleteAccountJob = (userId: string) => {
  deleteAccountQueue.add('deleteAccount', { userId }, { delay: 2 * 60 * 1000 });
};

import { createClient } from 'redis';
import { appConfig } from './appConfig';
import { logger } from '../utils/logger';

const redisClient = createClient({
  username: appConfig.REDIS_USERNAME,
  password: appConfig.REDIS_PASSWORD,
  socket: {
    host: appConfig.REDIS_HOST,
    port: 12624,
  },
});

redisClient.on('error', (err) => logger.error(err));

async function redisConnect() {
  await redisClient.connect();
}

export { redisConnect, redisClient };

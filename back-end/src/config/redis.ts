import { createClient } from 'redis';
import { appConfig } from './appConfig';

const redisClient = createClient({
  username: appConfig.REDIS_USERNAME,
  password: appConfig.REDIS_PASSWORD,
  socket: {
    host: appConfig.REDIS_HOST,
    port: 12624,
  },
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

async function redisConnect() {
  await redisClient.connect();
}

export { redisConnect, redisClient };

import { createClient } from 'redis';

const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: 12624,
  },
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

async function redisConnect() {
  await redisClient.connect();
}

export { redisConnect, redisClient };

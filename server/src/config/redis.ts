import { createClient } from 'redis';
import { appConfig } from './appConfig';
import { logger } from '../utils/logger';


const redisClient = createClient({
  username: appConfig.REDIS_USERNAME,
  password: appConfig.REDIS_PASSWORD,
  socket: {
        host: appConfig.REDIS_HOST,
        port: 14722
    }
});

(async()=>{
  redisClient.on('error', (err) => logger.error(err));
  redisClient.on('ready', ()=> logger.info("Redis is ready"))
  await redisClient.connect();
})();



export {  redisClient };


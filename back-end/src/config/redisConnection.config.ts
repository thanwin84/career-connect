import { appConfig } from './appConfig';

export const redisConnectionConfig = {
  username: appConfig.REDIS_USERNAME,
  password: appConfig.REDIS_PASSWORD,
  host: appConfig.REDIS_HOST,
  port: 12624,
};

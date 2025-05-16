import * as dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_MESSAGING_SERVICE_ID: process.env.TWILIO_MESSAGING_SERVICE_ID,
  FRONT_END_BASE_URL: process.env.FRONT_END_BASE_URL,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  MAILTRAP_AUTH_USER: process.env.MAILTRAP_AUTH_USER,
  MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD,
};

export const sortOptions = {
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  'a-z': { position: 1 },
  'z-a': { position: -1 },
};

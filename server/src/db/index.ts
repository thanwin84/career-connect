import mongoose from 'mongoose';
import { db_name } from '../constants';
import { appConfig } from '../config/appConfig';
import { logger } from '../utils/logger';

const connectToDB = async () => {
  try {
    const connectionString = `${appConfig.MONGO_URI}/${db_name}`;
    const connectionInstance = await mongoose.connect(connectionString);
    logger.info(
      {
        host: connectionInstance.connection.host,
        port: connectionInstance.connection.port,
        db_name: connectionInstance.connection.name,
      },
      'mongodb has connected successfully'
    );
  } catch (error) {
    logger.error('mongodb connection failed', error);
    process.exit(1);
  }
};

export default connectToDB;

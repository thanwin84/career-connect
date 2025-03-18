import mongoose from 'mongoose';
import { db_name } from '../constants';
import { appConfig } from '../config/appConfig';

const connectToDB = async () => {
  try {
    const connectionString = `${appConfig.MONGO_URI}/${db_name}`;
    const connectionInstance = await mongoose.connect(connectionString);
    console.log('mongodb has connected successfully', {
      host: connectionInstance.connection.host,
      port: connectionInstance.connection.port,
      db_name: connectionInstance.connection.name,
    });
  } catch (error) {
    console.log('mongodb connection failed', error);
    process.exit(1);
  }
};

export default connectToDB;

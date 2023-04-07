import mongoose from 'mongoose';
import { Express } from 'express';
import config from 'config';
import logger from '../../utils/logger';

const db: any = config.get('db');

const connectDB = async (app: Express) => {
  try {
    await mongoose.connect(`${db.uri}`, {
      dbName: db.name,
      connectTimeoutMS: 10000
    });

    if (app.get('env') !== 'test') {
      logger.Success(`Connected to ${db.uri} using MongoDB`);
    }
  } catch (err) {
    if (app.get('env') !== 'test') {
      logger.Danger(`Failed to connect to ${db.uri}`);
    }
  }
};

export default connectDB;

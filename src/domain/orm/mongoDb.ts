import mongoose from 'mongoose';
import { Express } from 'express';
import config from 'config';
import logger from '../../utils/logger';

const db = config.get('db');

const connectDB = async (app: Express) => {
  try {
    await mongoose.connect(`${db}`);

    if (app.get('env') !== 'test') {
      logger.Success(`Connected to ${db} using MongoDB`);
    }
  } catch (err) {
    if (app.get('env') !== 'test') {
      logger.Danger(`Failed to connect to ${db}`);
    }
  }
};

export default connectDB;

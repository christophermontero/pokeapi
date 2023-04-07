import _ from 'lodash';
import Trainer from '../entities/Trainer';
import logger from '../../utils/logger';
import { ITrainer } from '../models/trainer';

export const TrainerORM = {
  Store: async (
    name: string,
    nickname: string,
    password: string,
    team: string
  ) => {
    const trainer: ITrainer = {
        name,
        nickname,
        password,
        team
      },
      document = new Trainer(trainer);
    try {
      return await document.save();
    } catch (error: any) {
      logger.Danger(`${error.message}`);
      throw error;
    }
  },
  FindByName: async (name: string) => {
    try {
      return await Trainer.findOne({ name });
    } catch (error: any) {
      logger.Danger(`${error.message}`);
      throw error;
    }
  },
  UpdateTrainer: async (trainer: ITrainer) => {
    const lastConnection = new Date();
    try {
      return await Trainer.findOneAndUpdate(
        { name: trainer.name },
        {
          lastConnection
        },
        {
          new: true
        }
      );
    } catch (error: any) {
      logger.Danger(`${error.message}`);
      throw error;
    }
  }
};

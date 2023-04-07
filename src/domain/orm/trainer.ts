import _ from 'lodash';
import Trainer from '../entities/Trainer';
import logger from '../../utils/logger';
import { ITrainer } from '../models/trainer';

export const TrainerORM = {
  Store: async (
    name: string,
    nickname: string,
    password: string,
    team: string,
    pepper: string
  ) => {
    const trainer: ITrainer = {
        name,
        nickname,
        password,
        team,
        pepper
      },
      document = new Trainer(trainer);
    try {
      return await document.save();
    } catch (error: any) {
      logger.Danger(`${error.message}`);
      throw error;
    }
  }
};

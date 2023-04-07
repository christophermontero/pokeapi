import _ from 'lodash';
import Trainer from '../entities/Trainer';
import logger from '../../utils/logger';

export const TrainerORM = {
  Store: async (
    name: string,
    nickname: string,
    password: string,
    team: string,
    pepper: string
  ) => {
    try {
      const trainer = new Trainer({
        name,
        nickname,
        password,
        team,
        pepper,
        createdAt: Date.now()
      });

      return await trainer.save();
    } catch (error: any) {
      logger.Danger(`${error.message}`);
    }
  }
};

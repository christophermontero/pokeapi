import logger from '../config/logger';
import Trainer from '../entities/Trainer';
import { ITrainer } from '../interfaces/trainer';

const findByName = async (name: string) => {
  try {
    return await Trainer.findOne({ name });
  } catch (error: any) {
    logger.error(error.message);
    throw error;
  }
};

const save = async (
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
    logger.error(error.message);
    throw error;
  }
};

const update = async (trainer: ITrainer) => {
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
    logger.error(error.message);
    throw error;
  }
};

export default { findByName, save, update };

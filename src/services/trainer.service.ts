import logger from '../config/logger';
import Trainer from '../entities/Trainer';
import { ITrainer } from '../interfaces/trainer';

const findByEmail = async (email: string) => {
  try {
    return await Trainer.findOne({ email });
  } catch (error: any) {
    logger.error(error.message);
    throw error;
  }
};

const save = async (
  email: string,
  name: string,
  nickname: string,
  password: string,
  team: string
) => {
  const trainer: ITrainer = {
      email,
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
      { email: trainer.email },
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

export default { findByEmail, save, update };

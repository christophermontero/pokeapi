import { Request, Response } from 'express';
import logger from '../../utils/logger';
import httpResponses from '../../constants/responses';
import { TrainerORM } from '../orm/trainer';

export const TrainerService = {
  Signup: async (req: Request, res: Response) => {
    try {
      const name = req.body.name,
        nickname = req.body.nickname,
        team = req.body.team,
        hashedPassword = req.body.hashedPassword,
        pepper = req.body.pepper;

      await TrainerORM.Store(name, nickname, hashedPassword, team, pepper);

      return res.status(201).json({
        code: httpResponses.OK.code,
        message: httpResponses.OK.message
      });
    } catch (error: any) {
      logger.Danger(`${error.message}`);

      return res.status(500).json({
        code: httpResponses.INTERNAL_ERROR.code,
        message: httpResponses.INTERNAL_ERROR.message
      });
    }
  },
  Singin: async (req: Request, res: Response) => {}
};

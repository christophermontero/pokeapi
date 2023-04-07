import { Request, Response } from 'express';
import logger from '../../utils/logger';
import httpResponses from '../../constants/responses';
import { TrainerORM } from '../orm/trainer';
import { SecurityService } from './security';

export const TrainerService = {
  Store: async (req: Request, res: Response) => {
    try {
      const name = req.body.name,
        nickname = req.body.nickname,
        password = req.body.password,
        team = req.body.team;

      const { hashedPassword, pepper } = await SecurityService.Hashing(
        password
      );

      await TrainerORM.Store(name, nickname, hashedPassword, team, pepper);

      return res.status(200).json({
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
  }
};

import bcrypt from 'bcrypt';
import config from 'config';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import httpResponses from '../../constants/responses';
import logger from '../../utils/logger';
import { TrainerORM } from '../orm/trainer';

export const AuthService = {
  Signup: async (req: Request, res: Response) => {
    const name = req.body.name,
      nickname = req.body.nickname,
      team = req.body.team,
      hashedPassword = req.body.hashedPassword;
    try {
      const trainerAlreadyExists = await TrainerORM.FindByName(name);

      if (trainerAlreadyExists) {
        return res.status(httpResponses.USER_TAKEN.httpCode).json({
          code: httpResponses.USER_TAKEN.code,
          message: httpResponses.USER_TAKEN.message
        });
      }

      await TrainerORM.Store(name, nickname, hashedPassword, team);

      return res.status(httpResponses.OK.httpCode).json({
        code: httpResponses.OK.code,
        message: httpResponses.OK.message
      });
    } catch (error: any) {
      logger.Danger(`${error.message}`);

      return res.status(httpResponses.INTERNAL_ERROR.httpCode).json({
        code: httpResponses.INTERNAL_ERROR.code,
        message: httpResponses.INTERNAL_ERROR.message
      });
    }
  },
  Singin: async (req: Request, res: Response) => {
    const enteredPassword = req.body.password,
      name = req.body.name;
    try {
      const trainer = await TrainerORM.FindByName(name);

      if (!trainer) {
        return res.status(httpResponses.USER_NOT_EXISTS.httpCode).json({
          code: httpResponses.USER_NOT_EXISTS.code,
          message: httpResponses.USER_NOT_EXISTS.message
        });
      }

      const hashedPassword = _.get(trainer, 'password', '');

      const isPasswordValid = await bcrypt.compare(
        enteredPassword,
        hashedPassword
      );

      if (!isPasswordValid) {
        return res.status(httpResponses.INVALID_TOKEN.httpCode).json({
          code: httpResponses.INVALID_TOKEN.code,
          message: httpResponses.INVALID_TOKEN.message
        });
      }

      const token = jwt.sign({ id: trainer._id }, config.get('jwtPrivateKey'), {
        expiresIn: 86400,
        algorithm: 'HS256',
        issuer: 'RocketmonApi'
      });

      await TrainerORM.UpdateTrainer(trainer);

      return res.status(httpResponses.OK.httpCode).json({
        code: httpResponses.OK.code,
        message: httpResponses.OK.message,
        data: {
          token
        }
      });
    } catch (error: any) {
      logger.Danger(`${error.message}`);

      return res.status(httpResponses.INTERNAL_ERROR.httpCode).json({
        code: httpResponses.INTERNAL_ERROR.code,
        message: httpResponses.INTERNAL_ERROR.message
      });
    }
  }
};

import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import _ from 'lodash';
import logger from '../config/logger';
import httpResponses from '../constants/responses';
import {
  default as authService,
  default as trainerService
} from '../services/trainer.service';
import generateToken from '../utils/jwt';

const signup = async (req: Request, res: Response) => {
  const { email, name, nickname, team, hashedPassword } = req.body;

  try {
    const trainerAlreadyExists = await authService.findByEmail(email);

    if (trainerAlreadyExists) {
      return res.status(httpStatus.CONFLICT).json({
        code: httpResponses.USER_TAKEN.code,
        message: httpResponses.USER_TAKEN.message
      });
    }

    const trainer = await authService.save(
      email,
      name,
      nickname,
      hashedPassword,
      team
    );

    const token = generateToken(trainer);

    return res.status(httpStatus.CREATED).json({
      code: httpResponses.CREATED.code,
      message: httpResponses.CREATED.message,
      data: {
        token
      }
    });
  } catch (error: any) {
    logger.error(error.message);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      code: httpResponses.INTERNAL_ERROR.code,
      message: httpResponses.INTERNAL_ERROR.message
    });
  }
};

const signin = async (req: Request, res: Response) => {
  const { email, password: enteredPassword } = req.body;

  try {
    const trainer = await authService.findByEmail(email);

    if (!trainer) {
      return res.status(httpStatus.NOT_FOUND).json({
        code: httpResponses.TRAINER_NOT_EXISTS.code,
        message: httpResponses.TRAINER_NOT_EXISTS.message
      });
    }

    const hashedPassword = _.get(trainer, 'password', '');

    const isPasswordValid = await bcrypt.compare(
      enteredPassword,
      hashedPassword
    );

    if (!isPasswordValid) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        code: httpResponses.INVALID_PASSWORD.code,
        message: httpResponses.INVALID_PASSWORD.message
      });
    }

    const token = generateToken(trainer);

    await trainerService.update(trainer);

    return res.status(httpStatus.OK).json({
      code: httpResponses.OK.code,
      message: httpResponses.OK.message,
      data: {
        token
      }
    });
  } catch (error: any) {
    logger.error(error.message);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      code: httpResponses.INTERNAL_ERROR.code,
      message: httpResponses.INTERNAL_ERROR.message
    });
  }
};

export default { signup, signin };

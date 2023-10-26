import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import _ from 'lodash';
import httpResponses from '../constants/responses';
import trainerService from '../services/trainer.service';
import generateToken from '../utils/jwt';

const profile = async (req: Request, res: Response) => {
  try {
    const trainer = await trainerService.findByEmail(req.body.user.email);

    if (!trainer) {
      return res.status(httpStatus.NOT_FOUND).json({
        code: httpResponses.TRAINER_NOT_EXISTS.code,
        message: httpResponses.TRAINER_NOT_EXISTS.message
      });
    }

    return res.status(httpStatus.OK).json({
      code: httpResponses.OK.code,
      message: httpResponses.OK.message,
      data: {
        trainer: {
          email: trainer.email,
          name: trainer.name,
          nickname: trainer.nickname,
          team: trainer.team,
          lastLogin: trainer.lastConnection
        }
      }
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      code: httpResponses.INTERNAL_ERROR.code,
      message: httpResponses.INTERNAL_ERROR.message
    });
  }
};

const signup = async (req: Request, res: Response) => {
  const { email, name, nickname, team, hashedPassword } = req.body;

  try {
    const trainerAlreadyExists = await trainerService.findByEmail(email);

    if (trainerAlreadyExists) {
      return res.status(httpStatus.CONFLICT).json({
        code: httpResponses.USER_TAKEN.code,
        message: httpResponses.USER_TAKEN.message
      });
    }

    const trainer = await trainerService.save(
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
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      code: httpResponses.INTERNAL_ERROR.code,
      message: httpResponses.INTERNAL_ERROR.message
    });
  }
};

const signin = async (req: Request, res: Response) => {
  const { email, password: enteredPassword } = req.body;

  try {
    const trainer = await trainerService.findByEmail(email);

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

    return res.status(httpStatus.OK).json({
      code: httpResponses.OK.code,
      message: httpResponses.OK.message,
      data: {
        token
      }
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      code: httpResponses.INTERNAL_ERROR.code,
      message: httpResponses.INTERNAL_ERROR.message
    });
  }
};

const signout = async (req: Request, res: Response) => {
  try {
    const trainer = await trainerService.findByEmail(req.body.user.email);

    if (!trainer) {
      return res.status(httpStatus.NOT_FOUND).json({
        code: httpResponses.TRAINER_NOT_EXISTS.code,
        message: httpResponses.TRAINER_NOT_EXISTS.message
      });
    }

    await trainerService.updateLastLogin(trainer);

    return res.status(httpStatus.NO_CONTENT);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      code: httpResponses.INTERNAL_ERROR.code,
      message: httpResponses.INTERNAL_ERROR.message
    });
  }
};

export default { profile, signup, signin, signout };

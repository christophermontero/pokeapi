import jwt from 'jsonwebtoken';
import config from '../config/config';
import { ITrainer } from '../interfaces/trainer';

const generateToken = (trainer: ITrainer) =>
  jwt.sign({ id: trainer._id, name: trainer.name }, config.jwt.secret, {
    expiresIn: 86400,
    algorithm: 'HS256',
    issuer: 'RocketmonAPI'
  });

export default generateToken;

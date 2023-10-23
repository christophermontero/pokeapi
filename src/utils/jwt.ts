import jwt from 'jsonwebtoken';
import config from '../config/config';
import { ITrainer } from '../interfaces/trainer';

const generateToken = (trainer: ITrainer) =>
  jwt.sign({ id: trainer._id, email: trainer.email }, config.jwt.secret, {
    expiresIn: config.jwt.accessExpirationSeconds,
    algorithm: config.jwt.algorithm,
    issuer: config.jwt.issuer
  });

export default generateToken;

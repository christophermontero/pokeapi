import config from 'config';
import jwt from 'jsonwebtoken';
import { ITrainer } from '../domain/models/trainer';

const generateToken = (trainer: ITrainer) =>
  jwt.sign(
    { id: trainer._id, name: trainer.name },
    config.get('jwtPrivateKey'),
    {
      expiresIn: 86400,
      algorithm: 'HS256',
      issuer: 'RocketmonApi'
    }
  );

export default generateToken;

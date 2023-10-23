import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import request from 'supertest';
import server from '../../src/app';
import httpResponses from '../../src/constants/responses';
import Trainer from '../../src/entities/Trainer';
import setupTestDB from '../utils/setupTestDB';

setupTestDB();

describe('/api/v1/auth', () => {
  describe('POST /signup', () => {
    let email: string,
      name: string,
      nickname: string,
      team: string,
      password: string;

    const exec = () => {
      return request(server).post('/api/v1/auth/signup').send({
        email,
        name,
        nickname,
        team,
        password
      });
    };

    beforeEach(() => {
      email = 'goldenboy@mailinator.com';
      name = 'ashketchum';
      nickname = 'golder boy';
      team = 'red';
      password = 'Test*2023#';
    });

    it('should register a new trainer successfully', async () => {
      const res = await exec();

      expect(res.status).toBe(httpStatus.CREATED);
      expect(res.body).toMatchObject({
        code: httpResponses.CREATED.code,
        message: httpResponses.CREATED.message
      });
    });

    it('should failed if password is invalid', async () => {
      password = '12345678';
      const res = await exec();

      expect(res.status).toBe(httpStatus.BAD_REQUEST);
      expect(res.body).toHaveProperty('message');
    });

    it('should falied if user already exists', async () => {
      await Trainer.collection.insertOne({
        email,
        name,
        nickname,
        team,
        password
      });

      const res = await exec();

      expect(res.status).toBe(httpStatus.CONFLICT);
      expect(res.body).toHaveProperty('code', httpResponses.USER_TAKEN.code);
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.USER_TAKEN.message
      );
    });
  });

  describe('POST /signin', () => {
    let email: string, password: string;

    const exec = () => {
      return request(server).post('/api/v1/auth/signin').send({
        email,
        password
      });
    };

    beforeEach(async () => {
      email = 'goldenboy@mailinator.com';
      password = 'Test*2023#';

      await Trainer.collection.insertOne({
        email: 'goldenboy@mailinator.com',
        name: 'ashketchum',
        nickname: 'Golden boy',
        team: 'red',
        password: await bcrypt.hash(password, 10)
      });
    });

    it('should login successfully', async () => {
      const res = await exec();

      expect(res.status).toBe(httpStatus.OK);
      expect(res.body).toHaveProperty('code', httpResponses.OK.code);
      expect(res.body).toHaveProperty('message', httpResponses.OK.message);
    });

    it('should falied if trainer not exists', async () => {
      email = 'johndoe@mailinator.com';
      const res = await exec();

      expect(res.status).toBe(httpStatus.NOT_FOUND);
      expect(res.body).toHaveProperty(
        'code',
        httpResponses.TRAINER_NOT_EXISTS.code
      );
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.TRAINER_NOT_EXISTS.message
      );
    });

    it('should falied if email is invalid', async () => {
      email = 'johndoe';
      const res = await exec();

      expect(res.status).toBe(httpStatus.BAD_REQUEST);
      expect(res.body).toHaveProperty('message');
    });

    it('should failed if password not matches', async () => {
      password = 'Test*2023';
      const res = await exec();

      expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
      expect(res.body).toHaveProperty(
        'code',
        httpResponses.INVALID_PASSWORD.code
      );
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.INVALID_PASSWORD.message
      );
    });
  });
});

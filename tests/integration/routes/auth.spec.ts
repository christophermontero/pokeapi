import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import httpResponses from '../../../src/constants/responses';
import Trainer from '../../../src/domain/entities/Trainer';
import server from '../../../src/server/index';

describe('/api/v1/auth', () => {
  afterAll(async () => {
    await server.close();
    mongoose.disconnect();
  });

  describe('POST /signup', () => {
    let name: string, nickname: string, team: string, password: string;

    const exec = () => {
      return request(server).post('/api/v1/auth/signup').send({
        name,
        nickname,
        team,
        password
      });
    };

    beforeEach(() => {
      name = 'ashketchum';
      nickname = 'golder boy';
      team = 'rojo';
      password = 'Test*2023#';
    });

    afterEach(async () => {
      await Trainer.deleteMany({});
    });

    it('should register a new trainer successfully', async () => {
      const res = await exec();

      expect(res.status).toBe(httpResponses.CREATED.httpCode);
      expect(res.body).toMatchObject({
        code: httpResponses.CREATED.code,
        message: httpResponses.CREATED.message
      });
    });

    it('should failed if password is invalid', async () => {
      password = '12345678';
      const res = await exec();

      expect(res.status).toBe(httpResponses.BAD_REQUEST.httpCode);
      expect(res.body).toHaveProperty('code', httpResponses.BAD_REQUEST.code);
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.BAD_REQUEST.message
      );
    });

    it('should falied if user already exists', async () => {
      await Trainer.collection.insertOne({
        name,
        nickname,
        team,
        password
      });

      const res = await exec();

      expect(res.status).toBe(httpResponses.USER_TAKEN.httpCode);
      expect(res.body).toHaveProperty('code', httpResponses.USER_TAKEN.code);
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.USER_TAKEN.message
      );
    });
  });

  describe('POST /signup', () => {
    let name: string, password: string;

    const exec = () => {
      return request(server).post('/api/v1/auth/signin').send({
        name,
        password
      });
    };

    beforeEach(async () => {
      name = 'ashketchum';
      password = 'Test*2023#';

      await Trainer.collection.insertOne({
        name: 'ashketchum',
        nickname: 'Golden boy',
        team: 'rojo',
        password: await bcrypt.hash(password, 10)
      });
    });

    afterEach(async () => {
      await Trainer.deleteMany({});
    });

    it('should login successfully', async () => {
      const res = await exec();

      expect(res.status).toBe(httpResponses.OK.httpCode);
      expect(res.body).toHaveProperty('code', httpResponses.OK.code);
      expect(res.body).toHaveProperty('message', httpResponses.OK.message);
    });

    it('should falied if trainer not exists', async () => {
      name = 'johndoe';
      const res = await exec();

      expect(res.status).toBe(httpResponses.TRAINER_NOT_EXISTS.httpCode);
      expect(res.body).toHaveProperty(
        'code',
        httpResponses.TRAINER_NOT_EXISTS.code
      );
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.TRAINER_NOT_EXISTS.message
      );
    });

    it('should falied if name is invalid', async () => {
      name = 'John Doe';
      const res = await exec();

      expect(res.status).toBe(httpResponses.BAD_REQUEST.httpCode);
      expect(res.body).toHaveProperty('code', httpResponses.BAD_REQUEST.code);
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.BAD_REQUEST.message
      );
    });

    it('should failed if password not matches', async () => {
      password = 'Test*2023';
      const res = await exec();

      expect(res.status).toBe(httpResponses.INVALID_PASSWORD.httpCode);
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

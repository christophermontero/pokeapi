import request from 'supertest';
import mongoose from 'mongoose';
import Trainer from '../../../src/domain/entities/Trainer';
import server from '../../../src/server/index';
import httpResponses from '../../../src/constants/responses';

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

    afterAll(async () => {
      if (mongoose.connection.readyState === 2) {
        await Trainer.deleteMany({});
      }
    });

    it('should register a new trainer successfully', async () => {
      const res = await exec();

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        code: httpResponses.OK.code,
        message: httpResponses.OK.message
      });
    });

    it('should return bad request error if the request is invalid', async () => {
      password = '12345678';
      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('code', httpResponses.BAD_REQUEST.code);
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.BAD_REQUEST.message
      );
    });

    it('should return internal error if database is down', async () => {
      await mongoose.disconnect();
      const res = await exec();

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty(
        'code',
        httpResponses.INTERNAL_ERROR.code
      );
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.INTERNAL_ERROR.message
      );
    });
  });
});

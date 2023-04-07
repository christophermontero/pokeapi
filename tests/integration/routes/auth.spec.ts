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

    it('should return bad request error if the request is invalid', async () => {
      password = '12345678';
      const res = await exec();

      expect(res.status).toBe(httpResponses.BAD_REQUEST.httpCode);
      expect(res.body).toHaveProperty('code', httpResponses.BAD_REQUEST.code);
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.BAD_REQUEST.message
      );
    });

    it('should return conflict error if user already exists', async () => {
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

  // describe('POST /signup', () => {
  //   let name: string, password: string;

  //   const exec = () => {
  //     return request(server).post('/api/v1/auth/signin').send({
  //       name,
  //       password
  //     });
  //   };

  //   beforeEach(() => {
  //     name = 'ashketchum';
  //     password = 'Test*2023#';
  //   });

  //   afterAll(async () => {
  //     if (mongoose.connection.readyState === 2) {
  //       await Trainer.deleteMany({});
  //     }
  //   });
  // });
});

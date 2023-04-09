import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import request from 'supertest';
import httpResponses from '../../../src/constants/responses';
import Trainer from '../../../src/domain/entities/Trainer';
import server from '../../../src/server/index';

describe('/api/v1/pokemon', () => {
  afterAll(async () => {
    await server.close();
    mongoose.disconnect();
  });

  describe('POST /', () => {
    let limit: string, offset: string, token: string;

    const exec = () => {
      return request(server)
        .get(`/api/v1/pokemon?limit=${limit}&offset=${offset}`)
        .set('Authorization', `Bearer ${token}`)
        .send();
    };

    beforeEach(async () => {
      limit = '10';
      offset = '0';

      await Trainer.collection.insertOne({
        name: 'ashketchum',
        nickname: 'Golden boy',
        team: 'rojo',
        password: await bcrypt.hash('Test*2023#', 10)
      });

      token = jwt.sign(
        { id: '1', name: 'ashketchum' },
        config.get('jwtPrivateKey'),
        { expiresIn: 86400, algorithm: 'HS256', issuer: 'RocketmonAPI' }
      );
    });

    afterEach(async () => {
      await Trainer.deleteMany({});
    });

    it('should get pokemon range successfully', async () => {
      const res = await exec();

      expect(res.status).toBe(httpResponses.OK.httpCode);
      expect(res.body).toHaveProperty('code', httpResponses.OK.code);
      expect(res.body).toHaveProperty('message', httpResponses.OK.message);
      expect(Array.isArray(res.body.data)).toBeTruthy();
    });

    it('should failed if limit is invalid', async () => {
      limit = '15';
      const res = await exec();

      expect(res.status).toBe(httpResponses.BAD_REQUEST.httpCode);
      expect(res.body).toHaveProperty('code', httpResponses.BAD_REQUEST.code);
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.BAD_REQUEST.message
      );
    });

    it('should failed if token is invalid', async () => {
      token = 'invalidToken';
      const res = await exec();

      expect(res.status).toBe(httpResponses.UNAUTHORIZED.httpCode);
      expect(res.body).toHaveProperty('code', httpResponses.UNAUTHORIZED.code);
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.UNAUTHORIZED.message
      );
    });

    it('should failed if user not exists', async () => {
      token = jwt.sign(
        { id: '1', name: 'profesoroak' },
        config.get('jwtPrivateKey'),
        { expiresIn: 86400, algorithm: 'HS256', issuer: 'RocketmonAPI' }
      );
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
  });

  describe('POST /:name', () => {
    let name: string, token: string;

    const exec = () => {
      return request(server)
        .get(`/api/v1/pokemon/${name}`)
        .set('Authorization', `Bearer ${token}`)
        .send();
    };

    beforeEach(async () => {
      name = 'omanyte';

      await Trainer.collection.insertOne({
        name: 'ashketchum',
        nickname: 'Golden boy',
        team: 'rojo',
        password: await bcrypt.hash('Test*2023#', 10)
      });

      token = jwt.sign(
        { id: '1', name: 'ashketchum' },
        config.get('jwtPrivateKey'),
        { expiresIn: 86400, algorithm: 'HS256', issuer: 'RocketmonAPI' }
      );
    });

    afterEach(async () => {
      await Trainer.deleteMany({});
    });

    it('should fetch pokemon by name successfully', async () => {
      const res = await exec();

      expect(res.status).toBe(httpResponses.OK.httpCode);
      expect(res.body).toHaveProperty('code', httpResponses.OK.code);
      expect(res.body).toHaveProperty('message', httpResponses.OK.message);
      expect(typeof res.body.data === 'object').toBeTruthy();
    });

    it('should failed if pokemon not exists', async () => {
      name = 'omanyt';
      const res = await exec();

      expect(res.status).toBe(httpResponses.POKEMON_NOT_EXISTS.httpCode);
      expect(res.body).toHaveProperty(
        'code',
        httpResponses.POKEMON_NOT_EXISTS.code
      );
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.POKEMON_NOT_EXISTS.message
      );
    });

    it('should failed if token is invalid', async () => {
      token = 'invalidToken';
      const res = await exec();

      expect(res.status).toBe(httpResponses.UNAUTHORIZED.httpCode);
      expect(res.body).toHaveProperty('code', httpResponses.UNAUTHORIZED.code);
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.UNAUTHORIZED.message
      );
    });

    it('should failed if user not exists', async () => {
      token = jwt.sign(
        { id: '1', name: 'profesoroak' },
        config.get('jwtPrivateKey'),
        { expiresIn: 86400, algorithm: 'HS256', issuer: 'RocketmonAPI' }
      );
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
  });
});

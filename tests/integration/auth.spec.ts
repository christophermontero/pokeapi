import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import server from '../../src/app';
import config from '../../src/config/config';
import httpResponses from '../../src/constants/responses';
import Trainer from '../../src/entities/Trainer';
import setupTestDB from '../utils/setupTest';

setupTestDB();

describe('/api/v1/auth', () => {
  const baseURI = '/api/v1/auth';

  describe('GET /profile', () => {
    let token: string;

    const exec = () => {
      return request(server)
        .get(`${baseURI}/me`)
        .set('Authorization', `Bearer ${token}`);
    };

    beforeEach(async () => {
      await Trainer.collection.insertOne({
        email: 'goldenboy@mailinator.com',
        name: 'ashketchum',
        nickname: 'Golden boy',
        team: 'red',
        password: await bcrypt.hash('Test*2023#', 10)
      });

      token = jwt.sign(
        { id: '1', email: 'goldenboy@mailinator.com' },
        config.jwt.secret,
        {
          expiresIn: 86400,
          algorithm: 'HS256',
          issuer: 'RocketmonAPI'
        }
      );
    });

    it('should be get profile info successfully', async () => {
      const res = await exec();

      expect(res.status).toBe(httpStatus.OK);
      expect(res.body).toHaveProperty('code', httpResponses.OK.code);
      expect(res.body).toHaveProperty('message', httpResponses.OK.message);
      expect(res.body.data).toHaveProperty('trainer');
    });

    it('should be failed if token is invalid', async () => {
      token = 'invalidToken';
      const res = await exec();

      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
      expect(res.body).toHaveProperty('code', httpResponses.UNAUTHORIZED.code);
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.UNAUTHORIZED.message
      );
    });

    it('should be failed if user not exists', async () => {
      token = jwt.sign({ id: '1', email: 'profesoroak' }, config.jwt.secret, {
        expiresIn: 86400,
        algorithm: 'HS256',
        issuer: 'RocketmonAPI'
      });
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
  });

  describe('POST /signup', () => {
    let email: string,
      name: string,
      nickname: string,
      team: string,
      password: string;

    const exec = () => {
      return request(server).post(`${baseURI}/signup`).send({
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

    it('should be register a new trainer successfully', async () => {
      const res = await exec();

      expect(res.status).toBe(httpStatus.CREATED);
      expect(res.body).toMatchObject({
        code: httpResponses.CREATED.code,
        message: httpResponses.CREATED.message
      });
    });

    it('should be failed if password is invalid', async () => {
      password = '12345678';
      const res = await exec();

      expect(res.status).toBe(httpStatus.BAD_REQUEST);
      expect(res.body).toHaveProperty('message');
    });

    it('should be falied if user already exists', async () => {
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
      return request(server).post(`${baseURI}/signin`).send({
        email,
        password
      });
    };

    beforeEach(async () => {
      email = 'goldenboy@mailinator.com';
      password = 'Test*2023#';

      await Trainer.collection.insertOne({
        email,
        name: 'ashketchum',
        nickname: 'Golden boy',
        team: 'red',
        password: await bcrypt.hash(password, 10)
      });
    });

    it('should be login successfully', async () => {
      const res = await exec();

      expect(res.status).toBe(httpStatus.OK);
      expect(res.body).toHaveProperty('code', httpResponses.OK.code);
      expect(res.body).toHaveProperty('message', httpResponses.OK.message);
    });

    it('should be falied if trainer not exists', async () => {
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

    it('should be falied if email is invalid', async () => {
      email = 'johndoe';
      const res = await exec();

      expect(res.status).toBe(httpStatus.BAD_REQUEST);
      expect(res.body).toHaveProperty('message');
    });

    it('should be failed if password not matches', async () => {
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

  describe('GET /signout', () => {
    let token: string;

    const exec = () => {
      return request(server)
        .get(`${baseURI}/signout`)
        .set('Authorization', `Bearer ${token}`);
    };

    beforeEach(async () => {
      await Trainer.collection.insertOne({
        email: 'goldenboy@mailinator.com',
        name: 'ashketchum',
        nickname: 'Golden boy',
        team: 'red',
        password: await bcrypt.hash('Test*2023#', 10)
      });

      token = jwt.sign(
        { id: '1', email: 'goldenboy@mailinator.com' },
        config.jwt.secret,
        {
          expiresIn: 86400,
          algorithm: 'HS256',
          issuer: 'RocketmonAPI'
        }
      );
    });

    it('should be signout successfully', async () => {
      const res = await exec();

      jest.setTimeout(10000);

      expect(res.status).toBe(httpStatus.NO_CONTENT);
    });

    it('should be failed if token is invalid', async () => {
      token = 'invalidToken';
      const res = await exec();

      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
      expect(res.body).toHaveProperty('code', httpResponses.UNAUTHORIZED.code);
      expect(res.body).toHaveProperty(
        'message',
        httpResponses.UNAUTHORIZED.message
      );
    });

    it('should be failed if user not exists', async () => {
      token = jwt.sign({ id: '1', email: 'profesoroak' }, config.jwt.secret, {
        expiresIn: 86400,
        algorithm: 'HS256',
        issuer: 'RocketmonAPI'
      });
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
  });
});

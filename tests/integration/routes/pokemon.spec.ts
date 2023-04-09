import mongoose from 'mongoose';
import request from 'supertest';
import httpResponses from '../../../src/constants/responses';
import server from '../../../src/server/index';

describe('/api/v1/pokemon', () => {
  afterAll(async () => {
    await server.close();
    mongoose.disconnect();
  });

  describe('POST /', () => {
    let limit: string, offset: string;

    const exec = () => {
      return request(server)
        .get(`/api/v1/pokemon?limit=${limit}&offset=${offset}`)
        .send();
    };

    beforeEach(() => {
      limit = '10';
      offset = '0';
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
  });

  describe('POST /:name', () => {
    let name: string;

    const exec = () => {
      return request(server).get(`/api/v1/pokemon/${name}`).send();
    };

    beforeEach(() => {
      name = 'omanyte';
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
  });
});

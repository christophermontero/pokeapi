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
      expect(res.body).toMatchObject({
        code: httpResponses.OK.code,
        message: httpResponses.OK.message
      });
    });
  });

  describe('POST /:name', () => {
    let name: string;

    const exec = () => {
      return request(server).get(`/api/v1/pokemon/${name}`).send();
    };

    beforeEach(async () => {
      name = 'omanyte';
    });

    it('should fetch pokemon by name successfully', async () => {
      const res = await exec();

      expect(res.status).toBe(httpResponses.OK.httpCode);
      expect(res.body).toHaveProperty('code', httpResponses.OK.code);
      expect(res.body).toHaveProperty('message', httpResponses.OK.message);
    });
  });
});

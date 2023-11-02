import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import validateToken from '../../../src/middlewares/token';
import config from '../../../src/config/config';
import httpResponses from '../../../src/constants/responses';

jest.mock('jsonwebtoken');

describe('validateToken middleware', () => {
  let mockRequest: Request, mockResponse: Response, nextFunction: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {
      header: jest.fn().mockReturnValue(`Bearer validToken`),
      body: {}
    } as unknown as Request;
    mockResponse = {} as Response;
    nextFunction = jest.fn();
  });

  it('should validate the token and call next if validation passes', () => {
    (jwt.verify as jest.Mock).mockReturnValue({ userId: '123' });

    validateToken()(mockRequest, mockResponse, nextFunction);

    expect(jwt.verify).toBeCalledWith('validToken', config.jwt.secret);
    expect(mockRequest.body.user).toEqual({ userId: '123' });
    expect(nextFunction).toBeCalledWith();
  });

  it('should return an error if no token is provided', () => {
    mockRequest.header = jest.fn().mockReturnValue(null);
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    validateToken()(mockRequest, mockResponse, nextFunction);

    expect(mockResponse.status).toBeCalledWith(httpStatus.UNAUTHORIZED);
    expect(mockResponse.json).toBeCalledWith({
      code: httpResponses.UNAUTHORIZED.code,
      message: httpResponses.UNAUTHORIZED.message
    });
  });

  it('should return an error if token verification fails', () => {
    mockRequest.header = jest.fn().mockReturnValue(`Bearer invalidToken`);
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    const error = new Error('Token verification failed');
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw error;
    });

    validateToken()(mockRequest, mockResponse, nextFunction);

    expect(jwt.verify).toBeCalledWith('invalidToken', config.jwt.secret);
    expect(mockResponse.status).toBeCalledWith(httpStatus.UNAUTHORIZED);
    expect(mockResponse.json).toBeCalledWith({
      code: httpResponses.UNAUTHORIZED.code,
      message: httpResponses.UNAUTHORIZED.message
    });
  });
});

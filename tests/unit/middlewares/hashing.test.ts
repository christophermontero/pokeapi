import bcrypt from 'bcrypt';
import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import logger from '../../../src/config/logger';
import httpResponses from '../../../src/constants/responses';
import hashingPassword from '../../../src/middlewares/hashing';

jest.mock('bcrypt');
jest.mock('../../../src/config/logger');

describe('Hashing password', () => {
  let mockRequest: Request, mockResponse: Response, nextFunction: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {
      body: {
        password: 'password123'
      }
    } as Request;
    mockResponse = {} as Response;
    nextFunction = jest.fn();
  });

  it('should hash the password and add it to the request body', async () => {
    (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

    await hashingPassword()(mockRequest, mockResponse, nextFunction);

    expect(bcrypt.genSalt).toBeCalled();
    expect(bcrypt.hash).toBeCalledWith('password123', 'salt');
    expect(mockRequest.body.hashedPassword).toEqual('hashedPassword');
    expect(nextFunction).toBeCalled();
  });

  it('should return an error if hashing fails', async () => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    const error = new Error('Hashing failed');
    (bcrypt.genSalt as jest.Mock).mockRejectedValue(error);

    await hashingPassword()(mockRequest, mockResponse, nextFunction);

    expect(bcrypt.genSalt).toBeCalled();
    expect(logger.error).toBeCalledWith('Hashing failed');
    expect(mockResponse.status).toBeCalledWith(
      httpStatus.INTERNAL_SERVER_ERROR
    );
    expect(mockResponse.json).toBeCalledWith({
      code: httpResponses.INTERNAL_ERROR.code,
      message: httpResponses.INTERNAL_ERROR.message
    });
  });
});

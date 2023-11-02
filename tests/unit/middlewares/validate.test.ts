import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import validate from '../../../src/middlewares/validate';
import ApiError from '../../../src/utils/ApiError';
import httpStatus from 'http-status';

describe('Validate', () => {
  let mockRequest: Request,
    mockResponse: Response,
    nextFunction: NextFunction,
    schema: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {
      body: {
        name: 'John Doe'
      }
    } as Request;
    mockResponse = {} as Response;
    nextFunction = jest.fn();
    schema = {
      body: Joi.object()
        .keys({
          name: Joi.string().min(2).max(50).required()
        })
        .required()
    };
  });

  it('should validate the request and call next if validation passes', () => {
    const mockResponse = {} as Response;
    const nextFunction: NextFunction = jest.fn();

    validate(schema)(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith();
  });

  it('should return an ApiError if validation fails', () => {
    mockRequest.body.name = 123;

    const mockResponse = {} as Response;
    const nextFunction: NextFunction = jest.fn();

    validate(schema)(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith(expect.any(ApiError));
    expect(nextFunction).toBeCalledWith(
      expect.objectContaining({
        statusCode: httpStatus.BAD_REQUEST,
        message: expect.stringContaining('must be a string')
      })
    );
  });
});

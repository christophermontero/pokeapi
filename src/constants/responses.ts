const httpResponses = {
  OK: {
    httpCode: 200,
    code: 'SUCCESS',
    message: 'The request has completed successfully'
  },
  BAD_REQUEST: {
    httpCode: 400,
    code: 'BAD_REQUEST',
    message: 'Bad request'
  },
  USER_TAKEN: {
    httpCode: 409,
    code: 'USER_TAKEN',
    message: 'User already exists'
  },
  USER_NOT_EXISTS: {
    httpCode: 404,
    code: 'USER_NOT_EXISTS',
    message: 'User not exists'
  },
  INVALID_PASSWORD: {
    httpCode: 401,
    code: 'INVALID_PASSWORD',
    message: 'Invalid password'
  },
  INTERNAL_ERROR: {
    httpCode: 500,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error'
  }
};

export default httpResponses;

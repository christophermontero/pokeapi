const httpResponses = {
  OK: {
    httpCode: 200,
    code: 'SUCCESS',
    message: 'The request has completed successfully'
  },
  CREATED: {
    httpCode: 201,
    code: 'SUCCESS',
    message: 'The request has completed successfully'
  },
  BAD_REQUEST: {
    httpCode: 400,
    code: 'BAD_REQUEST',
    message: 'Bad request'
  },
  UNAUTHORIZED: {
    httpCode: 401,
    code: 'UNAUTHORIZED',
    message: 'Token is not valid'
  },
  USER_NOT_EXISTS: {
    httpCode: 404,
    code: 'USER_NOT_EXISTS',
    message: 'User not exists'
  },
  POKEMON_NOT_EXISTS: {
    httpCode: 404,
    code: 'POKEMON_NOT_EXISTS',
    message: 'Pokemon not exists'
  },
  USER_TAKEN: {
    httpCode: 409,
    code: 'USER_TAKEN',
    message: 'User already exists'
  },
  INVALID_PASSWORD: {
    httpCode: 422,
    code: 'INVALID_PASSWORD',
    message: 'Invalid password'
  },
  TRAINER_NOT_EXISTS: {
    httpCode: 422,
    code: 'TRAINER_NOT_EXISTS',
    message: 'Trainer not exists'
  },
  INTERNAL_ERROR: {
    httpCode: 500,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error'
  }
};

export default httpResponses;

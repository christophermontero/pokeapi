const httpResponses = {
  OK: {
    code: 'SUCCESS',
    message: 'The request has completed successfully'
  },
  CREATED: {
    code: 'CREATED',
    message: 'The request has completed successfully'
  },
  BAD_REQUEST: {
    code: 'BAD_REQUEST',
    message: 'Bad request'
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'Token is invalid'
  },
  POKEMON_NOT_EXISTS: {
    code: 'POKEMON_NOT_EXISTS',
    message: 'Pokemon not exists'
  },
  TRAINER_NOT_EXISTS: {
    code: 'TRAINER_NOT_EXISTS',
    message: 'Trainer not exists'
  },
  USER_TAKEN: {
    code: 'USER_TAKEN',
    message: 'User already exists'
  },
  INVALID_PASSWORD: {
    code: 'INVALID_PASSWORD',
    message: 'Invalid password'
  },
  INTERNAL_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error'
  }
};

export default httpResponses;

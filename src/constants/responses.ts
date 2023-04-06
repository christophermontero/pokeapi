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
  INTERNAL_ERROR: {
    httpCode: 500,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error'
  }
};

export default httpResponses;

import dotenv from 'dotenv';
import Joi from 'joi';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required()
      .description('Environment mode'),
    PORT: Joi.number().default(3000).description('Port to run the app'),
    POKEMON_BASE_URL: Joi.string().required().description('Pokemon base url'),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    MONGODB_TIMEOUT: Joi.number()
      .default(10000)
      .description('Mongo DB timeout'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_SECONDS: Joi.number()
      .default(3600)
      .description('seconds after which access tokens expire'),
    JWT_ALGORITHM: Joi.string()
      .default('HS256')
      .description('Algorithm for JWT'),
    JWT_ISSUER: Joi.string().default('issuer').description('Issuer for JWT')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  pokemon: {
    baseUrl: envVars.POKEMON_BASE_URL
  },
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      connectTimeoutMS: envVars.MONGODB_TIMEOUT,
      w: 'majority'
    }
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationSeconds: envVars.JWT_ACCESS_EXPIRATION_SECONDS,
    algorithm: envVars.JWT_ALGORITHM,
    issuer: envVars.JWT_ISSUER
  }
};

import * as Joi from 'joi';

export const configSchemaValidation = Joi.object({
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_URI: Joi.string().uri().required(),

  JWT_SECRET_KEY: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),

  APP_SERVICE_NAME: Joi.string().required(),
  APP_EMAIL_ADDRESS: Joi.string().required(),
  APP_EMAIL_PASSWORD: Joi.string().required(),

  COOKIE_TOKEN_MAX_AGE: Joi.number().required(),
});

import * as Joi from 'joi';

export const configSchemaValidation = Joi.object({
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_URI: Joi.string().uri().required(),
});

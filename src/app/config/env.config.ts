import * as Joi from 'joi';

export const envSchema = Joi.object({
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_ONBOARDING_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
  RABBITMQ_URL: Joi.string().required(),
});

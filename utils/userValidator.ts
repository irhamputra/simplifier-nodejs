import Joi from 'joi';
import { NewUser, UserLogin } from '../models/User';
import { pattern } from '../constants/regex';

const registerValidator = (user: NewUser) => {
  const schema = Joi.object({
    id: Joi.string().uuid(),
    firstName: Joi.string().required().min(3).trim(),
    lastName: Joi.string().required().min(3).trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().length(8).required().trim().regex(pattern),
    confirmPassword: Joi.ref('password')
  }).with('password', 'confirmPassword');

  return Joi.validate(user, schema);
};

const loginValidator = (user: UserLogin) => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().length(8).required().trim().regex(pattern)
  });

  return Joi.validate(user, schema);
};

export { registerValidator, loginValidator };

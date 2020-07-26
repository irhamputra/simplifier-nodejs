import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const signToken = (user: Pick<User, 'id' | 'email'>) => {
  return jwt.sign(user, process.env.JWT_SECRET || '', {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const decodeToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET || '');
};

export { signToken, decodeToken };

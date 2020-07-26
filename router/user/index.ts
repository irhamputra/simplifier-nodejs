import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { registerValidator } from '../../utils/userValidator';
import { NewUser, UserLogin } from '../../models/User';
import { signToken } from '../../utils/token';

const router = express.Router();
const baseUrl = 'https://jsonblob.com/api/jsonBlob/78c4ab74-cf1c-11ea-801d-6b19478ed55c';

router.post('/register', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const user: NewUser = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    };

    try {
      const { value, error } = registerValidator(user);

      if (!error) {
        const token = signToken(value);
        const { data } = await axios.post<{ token: string }>(baseUrl, user);
        console.log(data);
        return res.status(200).json(token);
      }
      throw new Error(error.message);
    } catch (e) {
      console.log('Failed to validate or signToken or rejected');
      return next(e);
    }
  } catch (e) {
    console.log('failed declare user or body');
    return next(e);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user: UserLogin = {
      email,
      password
    };

    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
});

export default router;

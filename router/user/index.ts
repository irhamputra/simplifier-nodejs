import express from 'express';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const user = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    };

    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = {
      email,
      password
    };

    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
});

export default router;

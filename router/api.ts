import express from 'express';
import axios, { AxiosBasicCredentials } from 'axios';
import ResponseModel from '../models/response';
import SuggestLocationModel from '../models/suggestLocation';

const router = express.Router();
const source = axios.CancelToken.source();

type Response = typeof ResponseModel | typeof SuggestLocationModel;

let cachedData: Response | null = null;
let cachedTime: number;

// TODO: change MemCache to Redis
router.get('/:zipCode', async (req, res, next) => {
  if (cachedTime && cachedTime > Date.now() - 30 * 1000) {
    return res.json(cachedData);
  }

  try {
    const { zipCode } = req.params;
    const { primeTimeConsumption: usage } = req.query;

    const auth: AxiosBasicCredentials = {
      username: process.env.USERNAME || '',
      password: process.env.PASSWORD || '',
    };

    const url = `${process.env.BASE_URL}${zipCode}?primeTimeConsumption=${usage}`;
    const { data } = await axios.get<Response>(url, { auth, cancelToken: source.token });

    cachedData = data;
    cachedTime = Date.now();

    return res.status(200).json(data);
  } catch (e) {
    if (axios.isCancel(e)) return source.cancel('Cancel by User');

    res.status(503).json({
      error: true,
      message: e.message,
    });
    return next(e);
  }
});

export default router;

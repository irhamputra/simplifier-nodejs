import express from 'express';
import axios, { AxiosBasicCredentials } from 'axios';
import { Response } from '../models';

const router = express.Router();
const source = axios.CancelToken.source();

let cachedData: Response | null = null;
let cachedTime: number;
let url: string;

router.get('/:zipCode', async (req, res, next) => {
  // TODO: change MemCache to Redis
  if (cachedTime && cachedTime > Date.now() - 30 * 1000) {
    return res.json(cachedData);
  }

  try {
    const { zipCode } = req.params;
    const {
      primeTimeConsumption: primaryUsage,
      secondaryTimeConsumption: secondaryUsage,
      houseNumber,
      street,
      city,
      customerType,
    } = req.query;
    const baseUrl = `${process.env.BASE_URL}${zipCode}`;

    const auth: AxiosBasicCredentials = {
      username: process.env.USERNAME || '',
      password: process.env.PASSWORD || '',
    };

    if (houseNumber) {
      url = `${baseUrl}/city/${city}/street/${street}/hnr/${houseNumber}?primeTimeConsumption=${primaryUsage}${
        secondaryUsage ? `&secondaryTimeConsumption=${secondaryUsage}` : ''
      }${customerType ? `&customerType=${customerType}` : ''}`;
    } else if (street) {
      url = `${baseUrl}/city/${city}/street/${street}?primeTimeConsumption=${primaryUsage}${
        secondaryUsage ? `&secondaryTimeConsumption=${secondaryUsage}` : ''
      }${customerType ? `&customerType=${customerType}` : ''}`;
    } else if (city) {
      url = `${baseUrl}/city/${city}?primeTimeConsumption=${primaryUsage}${
        secondaryUsage ? `&secondaryTimeConsumption=${secondaryUsage}` : ''
      }${customerType ? `&customerType=${customerType}` : ''}`;
    } else {
      url = `${baseUrl}?primeTimeConsumption=${primaryUsage}${
        secondaryUsage ? `&secondaryTimeConsumption=${secondaryUsage}` : ''
      }${customerType ? `&customerType=${customerType}` : ''}`;
    }

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

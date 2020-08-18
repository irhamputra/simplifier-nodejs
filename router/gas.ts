import express from 'express';
import axios, { AxiosBasicCredentials } from 'axios';
import { Response } from '../models/Response';

const router = express.Router();
const { cancel, token } = axios.CancelToken.source();

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
    const { primeTimeConsumption: primaryUsage, houseNumber, street, city, customerType } = req.query;
    const baseUrl = `${process.env.BASE_URL}gas/zipCode/${zipCode}`;

    const auth: AxiosBasicCredentials = {
      username: process.env.USERNAME || '',
      password: process.env.PASSWORD || ''
    };

    if (houseNumber) {
      url = `${baseUrl}/city/${city}/street/${street}/hnr/${houseNumber}?primeTimeConsumption=${primaryUsage}${
        customerType ? `&customerType=${customerType}` : ''
      }`;
    } else if (street) {
      url = `${baseUrl}/city/${city}/street/${street}?primeTimeConsumption=${primaryUsage}${
        customerType ? `&customerType=${customerType}` : ''
      }`;
    } else if (city) {
      url = `${baseUrl}/city/${city}?primeTimeConsumption=${primaryUsage}${
        customerType ? `&customerType=${customerType}` : ''
      }`;
    } else {
      url = `${baseUrl}?primeTimeConsumption=${primaryUsage}${customerType ? `&customerType=${customerType}` : ''}`;
    }

    const { data } = await axios.get<Response>(url, { auth, cancelToken: token });

    cachedData = data;
    cachedTime = Date.now();

    return res.status(200).json(data);
  } catch (e) {
    const error = e as Error;
    if (axios.isCancel(error)) return cancel('Cancel by User');

    const statusCode = parseInt(error.message.replace(/\D+/gi, ''));

    res.status(statusCode).json({
      error: true,
      statusCode,
      message: error.message
    });

    return next(e);
  }
});

export default router;

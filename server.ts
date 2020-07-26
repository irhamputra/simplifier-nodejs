import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';

import EnergyRoute from './router/energy';
import GasRoute from './router/gas';
import UserRoute from './router/user';

import { contentSecurityPolicy } from './config';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet({ contentSecurityPolicy }));
app.use(cors());
app.use(bodyParser.json({ limit: '10kb', type: ['json', 'application/csp-report'] }));

app.use('/api/v1/energy', EnergyRoute);
app.use('/api/v1/gas', GasRoute);
app.use('/api/v1/user', UserRoute);

app.get('/', (_, res) => {
  res.send(`<h1 style="font-family: Helvetica, sans-serif">You are good to go 🥳</h1>`);
});

app.post('/report-violation', async (req, res) => {
  if (req.body) {
    console.log('CSP', req.body);
  } else {
    console.log('No data');
  }

  res.status(204).end();
});

app.listen(port, () => console.log(`Server running on port:${port}`));

import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import EnergyRoute from './router/energy';
import GasRoute from './router/gas';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: '10kb', type: ['json', 'application/csp-report'] }));

app.use('/api/v1/energy', EnergyRoute);
app.use('/api/v1/gas', GasRoute);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (_, res) => {
  res.redirect('/swagger');
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

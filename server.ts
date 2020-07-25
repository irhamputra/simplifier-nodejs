import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import routerEnergy from './router/energy';
import routerGas from './router/gas';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/v1/energy', routerEnergy);
app.use('/api/v1/gas', routerGas);

app.get('/', (_, res) => {
  res.send(`<h1 style="font-family: Helvetica, sans-serif">You are good to go 🥳</h1>`);
});

app.listen(port, () => console.log(`Server running on port:${port}`));

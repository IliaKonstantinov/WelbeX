import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { DB } from './db.js';
import { router } from './routes/routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api', router);

const start = async () => {
  try {
    await DB.authenticate();
    await DB.sync();
    app.listen(PORT,() => {
      console.log('Server ok. PORT: ' + PORT);
    });
  } catch (e) {
    console.log(e)
  }
}

start();
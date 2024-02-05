import express from 'express';

import cors from 'cors';
import producersRouter from './api/producers/router';

const app = express();
process.on('uncaughtException', function (err) {
  console.log(err);
});

app.use(cors());

app.use(express.json());

app.use('/api/producers', producersRouter);

const PORT = 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
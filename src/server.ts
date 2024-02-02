import express from 'express';

import farmersRouter from './api/farmers/router';

const app = express();
process.on('uncaughtException', function (err) {
  console.log(err);
});

app.use(express.json());

app.use('/vehicles', farmersRouter);

const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
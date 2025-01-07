import cors from 'cors';
import express from 'express';
import getRouter from './Routers/get.mjs';
import sp500Router from './Routers/sp500.mjs';

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json());

app.use(getRouter);
app.use(sp500Router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

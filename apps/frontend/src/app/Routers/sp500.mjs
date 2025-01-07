import { Router } from 'express';
import {
  array_analysis,
  histogram,
} from '../../../../../src/data/sp500_analisys.mjs';

const router = Router();

const middleWare = (req, res, next) => {
  console.log('post middleware');
  next();
};

router.use(middleWare);

router.post('/api/sp500', (req, res) => {
  return res.status(200).send({ array_analysis, histogram });
});

export default router;

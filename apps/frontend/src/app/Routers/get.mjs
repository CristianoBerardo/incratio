import { Router } from 'express';
import { array_analysis, histogram } from '../../data/sp500_analisys.mjs';

const router = Router();

const middleWare = (req, res, next) => {
  console.log('get middleware');
  next();
};

router.use(middleWare);

router.get('/api/getsp500', (req, res) => {
  return res.status(200).send({ array_analysis, histogram });
});

export default router;

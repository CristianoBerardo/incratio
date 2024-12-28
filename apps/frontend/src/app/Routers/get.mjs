import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  array_analysis,
  histogram,
} from '../../../../../src/data/sp500_analisys.mjs';

const router = Router();

const middleWare = (req, res, next) => {
  console.log('get middleware');
  next();
};

router.use(middleWare);

router.get('/api/getsp500', (req, res) => {
  return res.status(200).send({ array_analysis, histogram });
});

router.get('/api/getsp500json', async (req, res) => { 
  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);

  const filePath = path.resolve(
    __dirname,
    '../../../../../src/data/sp500_analisys.json'
  );

  const data = await fs.readFile(filePath, 'utf-8');

  return res.status(200).send(JSON.parse(data));
});

router.get('/api/getVwce', async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);

  const filePath = path.resolve(
    __dirname,
    '../../../../../src/data/VWCE-MI.json'
  );

  const data = await fs.readFile(filePath, 'utf-8');

  return res.status(200).send(JSON.parse(data));
});

export default router;

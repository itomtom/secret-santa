import { Router } from 'express';
import { getDrawHistory, startDraw } from './service';

const router = Router();

router.post('/', async (_, res) => {
  const results = await startDraw();

  if ('error' in results) {
    res.status(400).send(results.error);
    return;
  }

  res.json(results);
});

router.get('/', async (_, res) => {
  const history = await getDrawHistory();
  res.json(history);
});

export default router;

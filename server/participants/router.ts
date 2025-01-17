import { Router } from 'express';
import { addParticipant, getParticipants, removeParticipant, updateBlacklist } from './service';

const router = Router();

router.get('/', async (_, res) => {
  const participants = await getParticipants();
  res.json(participants);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const participant = await addParticipant(name);
  res.json(participant);
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await removeParticipant(id);
  res.sendStatus(204);
});

router.patch('/:id/blacklist', async (req, res) => {
  const id = parseInt(req.params.id);
  const { blacklist } = req.body;
  if (
    !Array.isArray(blacklist) ||
    (Array.isArray(blacklist) && blacklist.some((id) => typeof id !== 'number'))
  ) {
    res.status(400).send('Blacklist must be an array of ids');
    return;
  }

  await updateBlacklist(id, blacklist);
  res.sendStatus(204);
});

export default router;

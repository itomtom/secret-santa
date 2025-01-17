import { Participant } from '../participants';
import DrawHistory, { Draw } from './model';

const getReceiver = (giver: Participant, participants: Participant[], excluding: number[]) => {
  const blacklist = giver.blacklist || [];
  const availableParticipants = participants.filter(
    (participant) =>
      participant.id !== giver.id && !blacklist.concat(excluding).includes(participant.id),
  );

  if (availableParticipants.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableParticipants.length);
  return availableParticipants[randomIndex];
};

export const startDraw = async () => {
  const participants = await Participant.findAll();
  const results: Draw[] = [];
  const excluding: number[] = [];

  if (participants.length < 2) {
    return { error: 'Not enough participants' };
  }

  for (let i = 0; i < participants.length; i++) {
    const giver = participants[i];
    const receiver = getReceiver(giver, participants, excluding);

    if (receiver === null) {
      return { error: `No available receiver for ${giver.name}` };
    }

    excluding.push(receiver?.id);
    results.push({
      giver: giver,
      receiver,
    });
  }

  await DrawHistory.create({ history: results });

  return results;
};

export const getDrawHistory = async () => {
  return await DrawHistory.findAll({
    order: [['createdAt', 'DESC']],
    limit: 5,
  });
};

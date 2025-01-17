import { default as Participant } from './model';

export const getParticipants = async () => {
  return await Participant.findAll();
};

export const addParticipant = async (name: string) => {
  return await Participant.create({ name });
};

export const removeParticipant = async (id: number) => {
  return await Participant.destroy({
    where: {
      id,
    },
  });
};

export const updateBlacklist = async (id: number, blacklist: number[]) => {
  return await Participant.update(
    { blacklist },
    {
      where: {
        id,
      },
    },
  );
};

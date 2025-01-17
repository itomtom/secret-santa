import express from 'express';
import request from 'supertest';
import bodyParser from 'body-parser';
import router from './router';
import sequelize from '../data/database';
import { Participant } from '../participants';

const app = express();
app.use(bodyParser.json());
app.use('/api/draw', router);

describe('Draw', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('should perform a draw successfully with exclusion and provide history', async () => {
    await Participant.bulkCreate([
      { name: 'Alice', blacklist: [2] },
      { name: 'Bob', blacklist: [] },
      { name: 'Charlie', blacklist: [] },
    ]);

    const response = await request(app).post('/api/draw');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
    const [first, second, third] = response.body;
    expect(first.giver.name).toBe('Alice');
    expect(second.giver.name).toBe('Bob');
    expect(third.giver.name).toBe('Charlie');

    expect(first.receiver.name).toBe('Charlie');

    const historyResponse = await request(app).get('/api/draw');
    expect(historyResponse.statusCode).toBe(200);
    expect(historyResponse.body).toHaveLength(1);

    const history = historyResponse.body[0];
    expect(history.history).toHaveLength(3);
    expect(history.history[0].giver.name).toBe('Alice');
    expect(history.history[0].receiver.name).toBe('Charlie');
  });

  test('should return an error for draw when there is only one participant', async () => {
    await Participant.create({ name: 'Alice' });

    const response = await request(app).post('/api/draw');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Not enough participants');
  });

  test('should return an error if a suitable receiver cannot be allocated', async () => {
    await Participant.bulkCreate([
      { name: 'Alice', blacklist: [2] },
      { name: 'Bob', blacklist: [] },
    ]);

    const response = await request(app).post('/api/draw');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('No available receiver for Alice');
  });
});

import express from 'express';
import request from 'supertest';
import bodyParser from 'body-parser';
import router from './router';
import sequelize from '../data/database';

const app = express();
app.use(bodyParser.json());
app.use('/api/participants', router);

describe('Participants', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('should add John as a participant', async () => {
    const response = await request(app).post('/api/participants').send({ name: 'John' });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('John');

    const participants = await request(app).get('/api/participants');
    expect(participants.body).toHaveLength(1);
    expect(participants.body[0].name).toBe('John');
  });

  test('should remove John as a participant', async () => {
    const response = await request(app).post('/api/participants').send({ name: 'John' });
    const { id, name } = response.body;
    expect(response.statusCode).toBe(200);
    expect(name).toBe('John');

    const deleteRes = await request(app).delete(`/api/participants/${id}`);
    expect(deleteRes.statusCode).toBe(204);
  });

  test('should add and update blacklist', async () => {
    const response = await request(app).post('/api/participants').send({ name: 'John' });
    const { blacklist, id } = response.body;
    expect(blacklist).toBeUndefined();

    const updateRes = await request(app)
      .patch(`/api/participants/${id}/blacklist`)
      .send({ blacklist: [1, 2, 3] });
    expect(updateRes.statusCode).toBe(204);

    const participants = await request(app).get('/api/participants');
    const participantJohn = participants.body[0];
    expect(participantJohn.name).toBe('John');
    expect(participantJohn.blacklist).toEqual([1, 2, 3]);
  });

  test('should throw error when blacklist is not array', async () => {
    const response = await request(app).post('/api/participants').send({ name: 'John' });
    const { blacklist, id } = response.body;
    expect(blacklist).toBeUndefined();

    const updateRes = await request(app)
      .patch(`/api/participants/${id}/blacklist`)
      .send({ blacklist: 1 });
    expect(updateRes.statusCode).toBe(400);
    expect(updateRes.text).toBe('Blacklist must be an array of ids');
  });
});

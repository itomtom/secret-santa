import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { router as participantsRouter } from './participants';
import { router as drawRouter } from './draw';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/participants', participantsRouter);
app.use('/api/draw', drawRouter);

export default app;

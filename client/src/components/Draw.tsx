import { useEffect, useState } from 'react';
import { BASE_API } from '../common/constants';
import { Participant } from './Participants';
import Mapping from './Mapping';

const DRAW_URL = `${BASE_API}/draw`;

export interface IDraw {
  receiver: Participant;
  giver: Participant;
}

interface IHistory {
  createdAt: string;
  id: number;
  history: IDraw[];
}

export default function Draw() {
  const [draw, setDraw] = useState<IDraw[]>([]);
  const [history, setHistory] = useState<IHistory[]>([]);

  async function getDraw() {
    const response = await fetch(DRAW_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    setDraw(data);
  }

  async function getHistory() {
    const response = await fetch(DRAW_URL);
    const data = await response.json();
    setHistory(data);
  }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center h-full">
      <h2 className="text-xl font-bold">Draw</h2>
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="mt-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-800 shadow-lg shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => getDraw()}
        >
          Start draw
        </button>
      </div>
      <div className="flex flex-col w-full h-5/6 px-8">
        <div className="flex-1 pt-3 text-center">
          <Mapping draw={draw}></Mapping>
        </div>
        <h3 className="text-sm font-semibold">History</h3>
        <div className="flex-1 overflow-y-auto">
          <ul
            aria-label="draw-history"
            className="relative border-s border-gray-700 ml-1"
          >
            {history.map(({ id, createdAt, history }) => (
              <li key={id} className="ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-500">
                  {new Date(createdAt).toLocaleString()}
                </time>
                <Mapping draw={history}></Mapping>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import DeleteIcon from '../assets/delete.svg';
import Select from 'react-select';
import { BASE_API } from '../common/constants';

export interface Participant {
  id: number;
  name: string;
  blacklist?: number[];
}

const PARTICIPANTS_URL = `${BASE_API}/participants`;

export default function Participants() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchParticipants() {
      const response = await fetch(`${PARTICIPANTS_URL}`);
      const data = await response.json();
      setParticipants(data);
    }
    fetchParticipants();
  }, []);

  async function addParticipant(name: string) {
    const response = await fetch(`${PARTICIPANTS_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setParticipants([...participants, data]);
  }

  async function deleteParticipant(id: number) {
    const response = await fetch(
      `${PARTICIPANTS_URL}/${encodeURIComponent(id)}`,
      {
        method: 'DELETE',
      }
    );
    if (response.ok) {
      setParticipants(
        participants.filter((participant) => participant.id !== id)
      );
    }
  }

  async function updateBlacklist(id: number, blacklist: number[]) {
    const response = await fetch(
      `${PARTICIPANTS_URL}/${encodeURIComponent(id)}/blacklist`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blacklist }),
      }
    );
    if (response.ok) {
      setParticipants(
        participants.map((participant) =>
          participant.id === id ? { ...participant, blacklist } : participant
        )
      );
    }
  }

  return (
    <div className="flex-1">
      <h2 className="text-xl font-bold justify-self-center">Participants</h2>
      <form
        onSubmit={() => {
          if (nameRef.current?.value) {
            addParticipant(nameRef.current.value);
          }
        }}
        className="max-w-sm mx-auto flex flex-col gap-3"
      >
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Name
          </label>
          <input
            ref={nameRef}
            type="text"
            id="name"
            className="border text-white text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
        >
          Add
        </button>
      </form>
      <hr className="h-px m-5 border-0 bg-gray-600" />

      <ul
        aria-labelledby="participants"
        className="divide-y divide-gray-700 mx-8"
      >
        {participants.length > 0 &&
          participants.map((participant) => {
            return (
              <li
                id={participant.id.toString()}
                key={participant.id}
                className="p-3"
              >
                <div className="flex items-center">
                  <div className="flex-1 font-medium truncate text-white">
                    {participant.name}
                  </div>
                  <div className="flex flex-row gap-4 items-center">
                    <div className="w-4 h-4">
                      <img
                        className="cursor-pointer"
                        src={DeleteIcon}
                        alt="Delete user"
                        onClick={() => deleteParticipant(participant.id)}
                      />
                    </div>

                    <label htmlFor="blacklist">Exclude</label>
                    <Select
                      defaultValue={participant.blacklist?.map((id) => {
                        const participant = participants.find(
                          (participant) => participant.id === id
                        );
                        return { value: id, label: participant?.name };
                      })}
                      isMulti
                      isClearable={false}
                      inputId="blacklist"
                      name="blacklist"
                      placeholder="Exclude"
                      styles={{
                        option: (base, { isDisabled }) => ({
                          ...base,
                          color: isDisabled ? '#CCC' : '#1D40AF',
                          cursor: isDisabled ? 'not-allowed' : 'default',
                        }),
                        multiValue: (styles) => {
                          return {
                            ...styles,
                            backgroundColor: '#E7EDFA',
                            color: '#0052CC',
                          };
                        },
                        multiValueRemove: (styles) => ({
                          ...styles,
                          color: '#0052CC',
                          ':hover': {
                            backgroundColor: '#0052CC',
                            color: 'white',
                          },
                        }),
                      }}
                      options={participants.map(({ id, name }) => {
                        return {
                          value: id,
                          label: name,
                          isDisabled: id === participant.id,
                        };
                      })}
                      onChange={(selected) => {
                        updateBlacklist(
                          participant.id,
                          selected.map(({ value }) => value)
                        );
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

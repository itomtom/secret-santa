import { IDraw } from './Draw';

interface IMappingProps {
  draw: IDraw[];
}

export default function Mapping({ draw }: IMappingProps) {
  return (
    <ul className="space-y-1 list-none list-inside text-gray-400">
      {draw.map(({ giver, receiver }) => (
        <li
          data-testid={`${giver.id}_${receiver.id}`}
          key={`${giver.id}_${receiver.id}`}
          className="space-x-2"
        >
          <span className="font-semibold text-xl text-white">
            {giver.name}
            <sub className="text-xs font-light">({giver.id})</sub>
          </span>
          <span>is Secret Santa for</span>
          <span className="font-semibold text-xl text-white">
            {receiver.name}
            <sub className="text-xs font-light">({receiver.id})</sub>
          </span>
        </li>
      ))}
    </ul>
  );
}

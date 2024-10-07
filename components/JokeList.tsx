import { joke } from '@/types';

export type JokeListProps = {
  jokes: joke[];
};

export default function JokeList({ jokes }: JokeListProps) {
  return (
    <div className='flex flex-col p-4'>
      <h2 className='text-xl text-black'>Jokes:</h2>
      {jokes.length ? (
        <ol className='flex flex-col gap-4 p-4 pl-8 list-decimal'>
          {jokes.map((joke) => (
            <li
              className='p-3 transition duration-300 hover:bg-black hover:text-white hover:marker:text-black rounded-xl'
              key={joke.id}
            >
              {joke.joke}
            </li>
          ))}
        </ol>
      ) : (
        <ul className='flex flex-col gap-4 p-4'>
          <li className='text-black'>
            No jokes yet. Click &quot;Tell me a joke!&quot; to start.
          </li>
        </ul>
      )}
    </div>
  );
}

import { ChangeEvent } from 'react';

export type JokePositionCheckboxProps = {
  handleJokePosition: (e: ChangeEvent<HTMLInputElement>) => void;
  shouldAppendJoke: boolean;
};

export default function JokePositionCheckbox({
  handleJokePosition,
  shouldAppendJoke,
}: JokePositionCheckboxProps) {
  return (
    <label className='flex items-center justify-center gap-2 bg-white text-black pointer p-2 px-3 rounded-xl md:hover:bg-black md:hover:text-white'>
      <input
        type='checkbox'
        onChange={handleJokePosition}
        checked={shouldAppendJoke}
      />
      Add new jokes to the bottom
    </label>
  );
}

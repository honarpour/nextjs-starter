export type FetchJokeButtonProps = {
  fetchJoke: () => void;
  isLoading: boolean;
};

export default function FetchJokeButton({
  fetchJoke,
  isLoading,
}: FetchJokeButtonProps) {
  return (
    <button
      type='button'
      onClick={fetchJoke}
      className='text-black bg-white pointer p-2 px-3 rounded-xl border-solid border-2 border-black [&:not(:disabled)]:md:hover:text-white [&:not(:disabled)]:md:hover:bg-black disabled:bg-gray disabled:border-gray disabled:text-white'
      disabled={isLoading}
      aria-label='Tell me a joke'
    >
      {isLoading ? 'Fetching...' : 'Tell me a joke!'}
    </button>
  );
}

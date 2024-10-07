import FetchJokeButton, { FetchJokeButtonProps } from './FetchJokeButton';
import JokePositionCheckbox, {
  JokePositionCheckboxProps,
} from './JokePositionCheckbox';
import TranslateDropdown, { TranslateDropdownProps } from './TranslateDropdown';

export type ToolbarProps = FetchJokeButtonProps &
  JokePositionCheckboxProps &
  TranslateDropdownProps;

export default function Toolbar({
  fetchJoke,
  isLoading,
  handleJokePosition,
  shouldAppendJoke,
  handleLanguage,
  language,
}: ToolbarProps) {
  return (
    <div className='flex flex-col md:flex-row gap-4 p-4 mb-4 w-full sticky top-0 bg-lightgray rounded-xl'>
      <FetchJokeButton fetchJoke={fetchJoke} isLoading={isLoading} />
      {!isLoading && (
        <>
          <JokePositionCheckbox
            handleJokePosition={handleJokePosition}
            shouldAppendJoke={shouldAppendJoke}
          />
          <TranslateDropdown
            handleLanguage={handleLanguage}
            language={language}
          />
        </>
      )}
    </div>
  );
}

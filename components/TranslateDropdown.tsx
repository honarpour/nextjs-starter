import { language } from '@/types';
import { ChangeEvent } from 'react';

export type TranslateDropdownProps = {
  handleLanguage: (e: ChangeEvent<HTMLSelectElement>) => void;
  language: language;
};

export default function TranslateDropdown({
  handleLanguage,
  language,
}: TranslateDropdownProps) {
  return (
    <label className='flex items-center justify-center gap-2 bg-white text-black p-2 px-3 rounded-xl md:hover:bg-black md:hover:text-white md:hover:[&>select]:text-black'>
      Translate:
      <select onChange={handleLanguage} value={language}>
        <option value='en'>English</option>
        <option value='fr'>French</option>
        <option value='es'>Spanish</option>
      </select>
    </label>
  );
}

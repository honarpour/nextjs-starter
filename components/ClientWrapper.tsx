'use client';

import { ChangeEvent, useState } from 'react';
import Toolbar from '@/components/Toolbar';
import { DEFUALT_LANGUAGE } from '@/constants';
import { joke, language } from '@/types';
import ErrorBanner from '@/components/ErrorBanner';
import JokeList from '@/components/JokeList';
import { fetchJoke, translateText } from '@/app/actions';

export default function ClientWrapper() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldAppendJoke, setShouldAppendJoke] = useState<boolean>(false);
  const [language, setLanguage] = useState<language>(DEFUALT_LANGUAGE);
  const [jokes, setJokes] = useState<joke[]>([]);
  const [error, setError] = useState<string>('');

  const clearError = () => {
    setError('');
  };

  const handleFetchJoke = async () => {
    clearError();
    setIsLoading(true);

    try {
      const joke = await fetchJoke(jokes.map(j => j.id.toString()));
      
      const updatedJokes = shouldAppendJoke
        ? [...jokes, joke]
        : [joke, ...jokes];

      setJokes(updatedJokes);
      
      // Reset to default language when fetching new joke
      if (language !== DEFUALT_LANGUAGE) {
        setLanguage(DEFUALT_LANGUAGE);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async (targetLanguage: language) => {
    if (targetLanguage === DEFUALT_LANGUAGE || jokes.length === 0) {
      return;
    }

    setIsLoading(true);

    try {
      const translatedJokes = await translateText(
        jokes.map(j => j.joke),
        targetLanguage
      );

      setJokes(jokes.map((joke, i) => ({
        ...joke,
        joke: translatedJokes[i]
      })));
    } catch (e) {
      setError((e as Error).message);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleJokePosition = (e: ChangeEvent<HTMLInputElement>) => {
    setShouldAppendJoke(e.target.checked);
  };

  const handleLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const targetLanguage = e.target.value as language;
    setLanguage(targetLanguage);
    handleTranslate(targetLanguage);
  };

  return (
    <>
      {!!error && <ErrorBanner message={error} clearError={clearError} />}
      <Toolbar
        fetchJoke={handleFetchJoke}
        isLoading={isLoading}
        handleJokePosition={handleJokePosition}
        shouldAppendJoke={shouldAppendJoke}
        handleLanguage={handleLanguage}
        language={language}
      />
      <main className='shadow-xl border-solid border-2 border-lightgray rounded-xl'>
        <JokeList jokes={jokes} />
      </main>
    </>
  );
} 
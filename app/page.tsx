'use client';

import { ChangeEvent, useState } from 'react';
import JokeList from '@/components/JokeList';
import Toolbar from '@/components/Toolbar';
import { DEFUALT_LANGUAGE, MAX_REPEAT_JOKE_FETCH_ATTEMPTS } from '@/constants';
import { joke, language } from '@/types';
import ErrorBanner from '@/components/ErrorBanner';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldAppendJoke, setShouldAppendJoke] = useState<boolean>(false);
  const [language, setLanguage] = useState<language>(DEFUALT_LANGUAGE);
  const [translationCache, setTranslationCache] = useState<
    Record<language, string[]>
  >({ en: [], fr: [], es: [] });
  const [jokes, setJokes] = useState<joke[]>([]);
  const [error, setError] = useState<string>('');

  const clearError = () => {
    setError('');
  };

  const fetchJoke = async (attempt = 1) => {
    clearError();

    if (attempt > MAX_REPEAT_JOKE_FETCH_ATTEMPTS) {
      setError(`Reached max attempt of ${MAX_REPEAT_JOKE_FETCH_ATTEMPTS}`);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    let joke: joke;

    try {
      const data = await fetch('/api/joke');
      joke = await data.json();
    } catch (e) {
      setError((e as Error).message);
      setIsLoading(false);
      return;
    }

    if (joke.error) {
      setError(joke.message);
      setIsLoading(false);
      return;
    }

    // The joke API might return a joke we've previously fetched.
    // If that's the case, fetch another joke.
    const isRepeatJoke = !!jokes.find((e) => e.id === joke.id);
    if (isRepeatJoke) {
      fetchJoke(attempt + 1);
      return;
    }

    let jokesInDefaultLanguage = jokes;
    if (language !== DEFUALT_LANGUAGE) {
      jokesInDefaultLanguage = [...jokes].map((e, i) => {
        e.joke = translationCache[DEFUALT_LANGUAGE][i];
        return e;
      });
      setLanguage(DEFUALT_LANGUAGE);
    }

    const updatedJokes = shouldAppendJoke
      ? [...jokesInDefaultLanguage, joke]
      : [joke, ...jokesInDefaultLanguage];

    setJokes(updatedJokes);

    // Cache jokes in default language for translation and reset cache
    setTranslationCache({
      en: [],
      fr: [],
      es: [],
      [DEFUALT_LANGUAGE]: updatedJokes.map((e) => e.joke),
    });

    setIsLoading(false);
  };

  const translateJokes = async (targetLanguage: language) => {
    // Get translation from cache if available
    if (translationCache[targetLanguage].length) {
      setJokes((prev) =>
        prev.map((e, i) => {
          e.joke = translationCache[targetLanguage][i];
          return e;
        }),
      );
      return;
    }

    setIsLoading(true);

    try {
      const data = await fetch('/api/translate', {
        method: 'POST',
        body: JSON.stringify({
          text: translationCache[DEFUALT_LANGUAGE],
          target_lang: targetLanguage,
        }),
      });
      const translatedJokes = await data.json();

      const tempJokes = [...jokes].map((e, i) => {
        e.joke = translatedJokes[i];
        return e;
      });

      setJokes(tempJokes);

      // Cache jokes in target language
      setTranslationCache((prev) => ({
        ...prev,
        [targetLanguage]: tempJokes.map((e) => e.joke),
      }));
    } catch (e) {
      setError((e as Error).message);
      return;
    }

    setIsLoading(false);
  };

  const handleJokePosition = (e: ChangeEvent<HTMLInputElement>) => {
    setShouldAppendJoke(e.target.checked);
  };

  const handleLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const targetLanguage = e.target.value as language;
    setLanguage(targetLanguage);
    translateJokes(targetLanguage);
  };

  return (
    <>
      {!!error && <ErrorBanner message={error} clearError={clearError} />}
      <div className='min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
        <Toolbar
          fetchJoke={fetchJoke}
          isLoading={isLoading}
          handleJokePosition={handleJokePosition}
          shouldAppendJoke={shouldAppendJoke}
          handleLanguage={handleLanguage}
          language={language}
        />
        <main className='shadow-xl border-solid border-2 border-lightgray rounded-xl'>
          <JokeList jokes={jokes} />
        </main>
      </div>
    </>
  );
}

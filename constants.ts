import { language } from './types';

export const DEFUALT_LANGUAGE: language = 'en';

export const JOKE_API_ENDPOINT = `https://v2.jokeapi.dev/joke/Any?safe-mode&type=single&lang=${DEFUALT_LANGUAGE}`;

export const MAX_REPEAT_JOKE_FETCH_ATTEMPTS = 3;

export const TRANSLATE_ENDPOINT = 'https://api-free.deepl.com/v2/translate';

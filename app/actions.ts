'use server';

import { joke, language } from '@/types';
import { JOKE_API_ENDPOINT, MAX_REPEAT_JOKE_FETCH_ATTEMPTS } from '@/constants';
import { cache } from 'react';
import { headers } from 'next/headers';

// Cache translations for 24 hours
const CACHE_TTL = 60 * 60 * 24;

// Get base URL for API calls
function getBaseUrl() {
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  return `${protocol}://${host}`;
}

// Cached joke fetching to prevent duplicates in a session
export const fetchJoke = cache(async (previousJokes: string[] = []): Promise<joke> => {
  let attempt = 1;
  
  while (attempt <= MAX_REPEAT_JOKE_FETCH_ATTEMPTS) {
    const response = await fetch(JOKE_API_ENDPOINT, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch joke');
    }
    
    const data = await response.json();
    
    // Format the joke to match our expected format
    const joke: joke = {
      id: data.id,
      safe: true,
      lang: 'en',
      type: 'single',
      category: data.category,
      joke: data.joke,
      flags: data.flags,
      error: false,
      message: ''
    };
    
    // Check if we've seen this joke before
    if (!previousJokes.includes(joke.id.toString())) {
      return joke;
    }
    
    attempt++;
  }
  
  throw new Error(`Reached max attempt of ${MAX_REPEAT_JOKE_FETCH_ATTEMPTS}`);
});

// Simple in-memory cache for translations
const translationCache = new Map<string, string[]>();

export async function translateText(text: string[], targetLang: language) {
  const cacheKey = `translation:${text.join('|')}:${targetLang}`;
  
  // Try to get from cache first
  const cached = translationCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  
  // Fetch new translations
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      target_lang: targetLang,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Translation failed');
  }
  
  const translations = await response.json();
  
  // Cache the result
  translationCache.set(cacheKey, translations);
  
  return translations;
} 
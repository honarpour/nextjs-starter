export type language = 'en' | 'fr' | 'es';

export type joke = {
  id: number;
  safe: true;
  lang: 'en';
  type: 'single';
  category: string;
  joke: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  error: boolean;
  message: string;
};

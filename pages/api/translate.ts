import { TRANSLATE_ENDPOINT } from '@/constants';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = string[] | Error;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    const data = await fetch(TRANSLATE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `DeepL-Auth-Key ${process.env.TRANSLATE_API_KEY}`,
      },
      body: req.body,
    });
    const dataJson = await data.json();
    const translatedJokes = dataJson.translations.map(
      (e: Record<string, string>) => e.text,
    );
    res.status(200).json(translatedJokes);
  } catch (e) {
    res.status(500).json(e as Error);
  }
}

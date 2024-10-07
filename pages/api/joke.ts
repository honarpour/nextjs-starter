import { JOKE_API_ENDPOINT } from '@/constants';
import { joke } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = joke | Error;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    const data = await fetch(JOKE_API_ENDPOINT);
    const joke: joke = await data.json();
    res.status(200).json(joke);
  } catch (e) {
    res.status(500).json(e as Error);
  }
}

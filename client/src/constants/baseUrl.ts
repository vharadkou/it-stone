import { env } from 'process';

export const baseUrl = env.NODE_ENV === 'production' ? 'https://it-stone.herokuapp.com/' : 'http://localhost:3030';

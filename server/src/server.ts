import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

export const server = async (): Promise<express.Express> => {
  return Promise.resolve(
    express()
      .use(cors())
      .options('*', cors)
      .use(json())
      .use(urlencoded({ extended: true })),
  );
};

import express from 'express';
import { setRoute } from './route';

export async function createApp(): Promise<express.Application> {
  const app: express.Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  setRoute(app);

  return app;
}

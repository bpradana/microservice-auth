import { createApp } from './app';
import express from 'express';

(async () => {
  try {
    const app: express.Application = await createApp();
    const port: number = Number(process.env.PORT) || 4000;
    app.listen(port, () => {
      console.log(`API-GATEWAY started on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
})();

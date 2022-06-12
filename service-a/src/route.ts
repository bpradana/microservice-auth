import express from 'express';
import { Request, Response } from 'express';
import { apiAdapter } from './api-adapter';
import { AxiosInstance } from 'axios';
import { authenticate } from './auth-middleware';

export async function setRoute(app: express.Application) {
  const authBaseUrl: string = process.env.AUTH_URL;
  const bBaseUrl: string = process.env.B_URL;
  const authApi: AxiosInstance = await apiAdapter(authBaseUrl);
  const bApi: AxiosInstance = await apiAdapter(bBaseUrl);

  app.get('/', authenticate, (req: Request, res: Response) => {
    res.send({
      message: 'service a is working',
      user: req.user,
    });
  });

  app.post('/auth', (req: Request, res: Response) => {
    authApi
      .post('/', req.body)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.data);
      });
  });

  app.get('/b', authenticate, (req: Request, res: Response) => {
    bApi
      .get('/', { headers: { Authorization: req.headers['authorization'] } })
      .then((response) => {
        res.send(response.data);
      }
      ).catch((error) => {
        res.status(error.response.status).send(error.response.data);
      }
      );
  });
}

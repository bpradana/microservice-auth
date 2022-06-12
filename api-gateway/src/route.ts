import { AxiosInstance } from 'axios';
import express from 'express';
import { Request, Response } from 'express';
import { apiAdapter } from './api-adapter';

export async function setRoute(app: express.Application) {
  const authBaseUrl: string = process.env.AUTH_URL;
  const aBaseUrl: string = process.env.A_URL;
  const bBaseUrl: string = process.env.B_URL;
  const authApi: AxiosInstance = await apiAdapter(authBaseUrl);
  const aApi: AxiosInstance = await apiAdapter(aBaseUrl);
  const bApi: AxiosInstance = await apiAdapter(bBaseUrl);

  app.get('/', (req: Request, res: Response) => {
    res.send({
      message: 'api gateway is working',
    });
  });

  app.get('/auth', (req: Request, res: Response) => {
    authApi
      .get('/')
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.data);
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

  app.get('/a', (req: Request, res: Response) => {
    aApi
      .get('/', { headers: { Authorization: req.headers['authorization'] } })
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.data);
      });
  });

  app.get('/a/b', (req: Request, res: Response) => {
    aApi
      .get('/b', { headers: { Authorization: req.headers['authorization'] } })
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.data);
      });
  });

  app.post('/a/auth', (req: Request, res: Response) => {
    aApi
      .post('/auth', req.body)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.data);
      });
  });

  app.get('/b', (req: Request, res: Response) => {
    bApi
      .get('/', { headers: { Authorization: req.headers['authorization'] } })
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.data);
      });
  });

  app.get('/b/a', (req: Request, res: Response) => {
    bApi
      .get('/a', { headers: { Authorization: req.headers['authorization'] } })
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.data);
      });
  });

  app.post('/b/auth', (req: Request, res: Response) => {
    bApi
      .post('/auth', req.body)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.data);
      });
  });
}

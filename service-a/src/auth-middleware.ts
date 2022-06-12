import { Request, Response, NextFunction } from 'express';
import { apiAdapter } from './api-adapter';
import { AxiosInstance } from 'axios';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader: string = req.headers['authorization'];
  const token: string = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  const authBaseUrl: string = process.env.AUTH_URL;
  const authApi: AxiosInstance = await apiAdapter(authBaseUrl);

  authApi
    .post('/verify', { accessToken: token })
    .then((response) => {
      req.user = response.data;
      next();
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data);
    });
}

import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function setRoute(app: express.Application) {
  app.get('/', (req: Request, res: Response) => {
    res.send({
      message: 'auth service is working',
    });
  });

  app.post('/', (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!(username === 'admin' && password === 'password')) {
      res.status(401).send({
        message: 'invalid username or password',
      });
    }

    const token: string = jwt.sign(
      { username },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.send({ accessToken: token });
  });

  app.post('/verify', (req: Request, res: Response) => {
    const { accessToken } = req.body;
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (error: any, decoded: any) => {
        if (error) return res.sendStatus(403);
        res.send(decoded);
      }
    );
  });
}

import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err.message === 'Invalid credentials') {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.status(500).json({ error: 'Internal server error' });
};
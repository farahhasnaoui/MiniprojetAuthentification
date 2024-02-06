import { Response } from 'express';

export const handleError = (res: Response, error: any) => {

  const message = error.message || 'An error occurred.';
  const status = error.status || 500;
  res.status(status).json({ message });
};

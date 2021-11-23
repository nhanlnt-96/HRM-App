import { Response } from 'express';

export const ApiError = (httpStatus: number, error: any, res: Response) => {
  res.status(httpStatus).json({
    success: false,
    error,
  });
};

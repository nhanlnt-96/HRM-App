import { Response } from 'express';

export const ApiSuccess = (httpStatus: number, data: any, res: Response) => {
  res.status(httpStatus).json({
    success: true,
    data,
  });
};

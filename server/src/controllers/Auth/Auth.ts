import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ApiError, ApiSuccess } from '../../shared/helper';
import { compare } from 'bcryptjs';
import { db } from '../../models';
import { createAuthToken } from '../../shared/service/jwt';

const { UserAccount } = db;

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const errors = validationResult(req);
  const recordCheck = await UserAccount.findOne({ where: { username } });
  if (errors.isEmpty() && recordCheck) {
    try {
      const isPasswordMatch = await compare(password, recordCheck.password);
      if (!isPasswordMatch) {
        ApiError(401, `Password is wrong.`, res);
      } else {
        const token = createAuthToken(recordCheck);
        ApiSuccess(200, { user: recordCheck, token }, res);
      }
    } catch (error) {
      ApiError(400, error, res);
    }
  } else {
    if (!recordCheck) {
      ApiError(401, `${username} doesn't exist.`, res);
    } else {
      ApiError(400, errors.array(), res);
    }
  }
};

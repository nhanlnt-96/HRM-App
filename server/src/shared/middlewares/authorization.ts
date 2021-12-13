import { IUserAccountAttributes } from '../../models/user';
import { ApiError } from '../helper';
import { NextFunction, Request, Response } from 'express';
import { roleRights } from '../../config/roles';
import passport from 'passport';

const verifyCallback =
  (req: Request, res: Response, resolve: any, requiredRights: string[]) =>
  (err: Error, user: IUserAccountAttributes, info: any) => {
    if (err || info || !user) {
      return ApiError(401, 'Unauthorized', res);
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.level);
      const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return ApiError(403, 'Forbidden', res);
      }
    }

    resolve();
  };

export const authorization =
  (...requiredRights: any) =>
  async (req: Request, res: Response, next: NextFunction) =>
    new Promise((resolve) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, res, resolve, requiredRights))(
        req,
        res,
        next,
      );
    })
      .then(() => next())
      .catch((err) => next(err));

import { sign, verify } from 'jsonwebtoken';
import { IUserAccountAttributes } from '../../models/user';
import moment from 'moment';
import { NextFunction, Request, Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE;
const generateToken = (userId: string, expires: any, type: string, secretToken = JWT_SECRET) => {
  const data = {
    sub: userId,
    exp: expires.unix(),
    type,
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return sign(data, secretToken);
};

const createAuthToken = (user: IUserAccountAttributes) => {
  const accessTokenExpire = moment().add(ACCESS_TOKEN_EXPIRE, 'days');
  const accessToken = generateToken(user.id, accessTokenExpire, 'access');

  return {
    access: { token: accessToken, expire: accessTokenExpire.toDate() },
  };
};

const verifyToken = (token: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const payload = verify(token, JWT_SECRET);
  return payload;
};

export { createAuthToken, verifyToken };

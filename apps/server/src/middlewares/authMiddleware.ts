import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/encryptedData';
import { RequestHandler } from 'express';

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.cookies;

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'You must be logged in to access this resource' });
  }

  //   const result = verifyToken(token);
  console.log('Tokens: ', token);

  next();
};

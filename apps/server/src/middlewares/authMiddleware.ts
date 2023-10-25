import { StatusCodes } from 'http-status-codes';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import { User, UserRequest } from '../types/types';

//? Check if user is logged in
export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'You must be logged in to access this resource' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
      select: {
        id: true,
        email: true,
        bio: true,
        name: true,
        username: true,
      },
    });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'You must be logged in to access this resource' });
    }

    req.user = user as User;

    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'You must be logged in to access this resource' });
  }
};

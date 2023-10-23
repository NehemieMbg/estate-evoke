import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../utils/prisma';
import { hashPassword } from '../utils/encryptedData';

export const createUser: RequestHandler = async (req, res) => {
  if (!req.body) res.json({ message: 'Body is missing' });

  const { email, firstName, lastName, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: await hashPassword(password),
      },
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: 'User created', data: user });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

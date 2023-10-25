import { RequestHandler } from 'express';
import prisma from '../utils/prisma';
import { createToken, hashPassword } from '../utils/encryptedData';
import { StatusCodes } from 'http-status-codes';
import { comparePassword } from '../utils/encryptedData';

// ? CREATE USER
export const createUser: RequestHandler = async (req, res) => {
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

    //? Log the user automatically after creating the account
    const token = createToken(user.id);
    res
      .cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(StatusCodes.CREATED)
      .json({ message: 'User created' });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

export const logUserIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Wrong email or password');

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new Error('Wrong email or password');

    const token = createToken(user.id);

    res
      .cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(StatusCodes.OK)
      .json({ message: 'User logged in' });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

export const logUserOut: RequestHandler = async (req, res) => {
  return res
    .clearCookie('jwt')
    .status(StatusCodes.OK)
    .json({ message: 'User logged out successfully' });
};

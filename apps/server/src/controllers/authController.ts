import { RequestHandler } from 'express';
import prisma from '../utils/prisma';
import { createToken, hashPassword } from '../utils/encryptedData';
import { StatusCodes } from 'http-status-codes';
import { comparePassword } from '../utils/encryptedData';
import { User } from '../types/types';

// ? CREATE USER
export const createUser: RequestHandler = async (req, res) => {
  const { email, name, username, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        username,
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

//? LOG USER IN
export const logUserIn: RequestHandler = async (req, res) => {
  const { email, username, password } = req.body as {
    email: string;
    username: string;
    password: string;
  };

  console.log(req.body);

  try {
    let user;

    if (email) {
      user = await prisma.user.findUnique({ where: { email } });
    } else if (username) {
      user = await prisma.user.findUnique({ where: { username } });
    }

    if (!user) throw new Error('Wrong email/username or password');

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new Error('Wrong email/username or password');

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

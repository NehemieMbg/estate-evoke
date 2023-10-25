import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../utils/prisma';
import { hashPassword } from '../utils/encryptedData';
import { User, UserRequest } from '../types/types';

// ? GET ALL USERS
export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
      },
    });

    res.status(StatusCodes.OK).json({ message: 'All users', data: users });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

// ? GET USER
export const getCurrentUser: RequestHandler = async (req: UserRequest, res) => {
  const { id } = req.user as User;

  try {
    const user = await prisma.user.findUnique({
      where: { id: id as string },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
        bio: true,
        email: true,
      },
    });

    res.status(StatusCodes.OK).json({ message: 'User found', data: user });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

// ? UPDATE USER
export const updateUser: RequestHandler = async (req: UserRequest, res) => {
  const { id } = req.user as User;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: id as string },
      data: req.body,
    });

    res
      .status(StatusCodes.OK)
      .json({ message: 'User updated', data: updatedUser });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

//? UPDATE USER EMAIL
export const updateUserEmail: RequestHandler = async (
  req: UserRequest,
  res
) => {
  const { id } = req.user as User;
  const { email } = req.body;

  try {
    await prisma.user.update({
      where: { id: id as string },
      data: {
        email,
      },
    });

    res.status(StatusCodes.OK).json({ message: 'User email updated' });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

// ? UPDATE USER PASSWORD
export const updateUserPassword: RequestHandler = async (
  req: UserRequest,
  res
) => {
  const { id } = req.user as User;
  const { newPassword } = req.body;

  try {
    await prisma.user.update({
      where: { id: id as string },
      data: {
        password: await hashPassword(newPassword),
      },
    });

    res.status(StatusCodes.OK).json({ message: 'User password updated' });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

// ? DELETE USER
export const deleteUser: RequestHandler = async (req: UserRequest, res) => {
  const { id } = req.user as User;

  try {
    await prisma.user.delete({ where: { id: id as string } });
    res
      .clearCookie('jwt')
      .status(StatusCodes.OK)
      .json({ message: 'User deleted' });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

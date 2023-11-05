import { RequestHandler } from 'express';
import { UserRequest } from '../types/types';
import prisma from '../utils/prisma';
import { User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

export const followUser: RequestHandler = async (req: UserRequest, res) => {
  const { id } = req.params;
  try {
    await prisma.follow.create({
      data: {
        followerId: req.user!.id,
        followingId: id,
      },
    });

    res.status(StatusCodes.CREATED).json({ message: 'User followed' });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

export const unfollowUser: RequestHandler = async (req: UserRequest, res) => {
  const { id } = req.params;
  try {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: req.user!.id,
          followingId: id,
        },
      },
    });

    res.status(StatusCodes.OK).json({ message: 'User unfollowed' });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

export const getFollows: RequestHandler = async (req: UserRequest, res) => {
  res.send('get follows');
};

export const isFollowing: RequestHandler = async (req: UserRequest, res) => {
  const { id } = req.params;
  try {
    const isFollowing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: req.user!.id,
          followingId: id,
        },
      },
    });

    res.status(StatusCodes.OK).json({ isFollowing: !!isFollowing });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

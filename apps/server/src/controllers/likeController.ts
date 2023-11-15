import { RequestHandler } from 'express';
import prisma from '../utils/prisma';
import { UserRequest } from '../types/types';
import { StatusCodes } from 'http-status-codes';

export const likePost: RequestHandler = async (req: UserRequest, res) => {
  const { postId } = req.params;

  try {
    await prisma.like.create({
      data: {
        postId: postId,
        userId: req.user!.id,
      },
    });

    res.status(StatusCodes.CREATED).json({ message: 'Post liked' });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

export const unlikePost: RequestHandler = async (req: UserRequest, res) => {
  const { postId } = req.params;

  try {
    await prisma.like.delete({
      where: {
        userId_postId: {
          postId: postId,
          userId: req.user!.id,
        },
      },
    });
    res.status(StatusCodes.OK).json({ message: 'Post unliked' });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

export const isLiking: RequestHandler = async (req: UserRequest, res) => {
  const { postId } = req.params;

  if (!req.user)
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'You must be connected!' });

  try {
    const isLiking = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: req.user!.id,
          postId: postId,
        },
      },
    });

    res.status(StatusCodes.OK).json({ isLiking: isLiking ? true : false });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

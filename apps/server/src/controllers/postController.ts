import { RequestHandler } from 'express';
import prisma from '../utils/prisma';
import { UserRequest } from '../types/types';
import cloudinary from 'cloudinary';
import * as fs from 'fs/promises';
import { StatusCodes } from 'http-status-codes';

export const createPost: RequestHandler = async (req: UserRequest, res) => {
  const { title, description } = req.body;

  try {
    if (!req.file)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Please upload an image' });

    const { path } = req.file;
    const response = await cloudinary.v2.uploader.upload(path);

    const coverResponse = await cloudinary.v2.uploader.upload(req.file.path, {
      transformation: [
        {
          width: 574,
          height: 442,
          crop: 'fill',
        },
      ],
    });

    await fs.unlink(req.file.path);

    const post = await prisma.post.create({
      data: {
        title,
        description,
        authorId: req.user?.id!,
        imageUrl: response.secure_url,
        imagePublicId: response.public_id,
        imageCoverUrl: coverResponse.secure_url,
        imageCoverPublicId: coverResponse.public_id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        imageCoverUrl: true,
      },
    });

    res.status(StatusCodes.CREATED).json({ message: 'Post created', post });
  } catch (error) {
    if (error instanceof Error)
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    else
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error || 'Something went wrong' });
  }
};

export const updatePost: RequestHandler = async (req: UserRequest, res) => {
  const { title, description } = req.body;
  const { postId } = req.params;

  try {
    await prisma.post.update({
      where: { id: postId },
      data: { title, description },
    });

    res.status(StatusCodes.OK).json({ message: 'Post updated' });
  } catch (error) {
    if (error instanceof Error)
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    else
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Something went wrong' });
  }
};

export const getPosts: RequestHandler = async (req, res) => {
  try {
    const post = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        author: {
          select: {
            username: true,
            avatar: true,
            name: true,
            location: true,
            posts: {
              take: 3,
              orderBy: { createdAt: 'desc' },
              select: {
                imageCoverUrl: true,
              },
            },
          },
        },
        title: true,
        description: true,
        imageCoverUrl: true,
        id: true,
        views: true,
        likes: true,
        comments: true,
        createdAt: true,
      },
    });

    res.status(StatusCodes.OK).json({ post });
  } catch (error) {
    if (error instanceof Error)
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    else
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Something went wrong' });
  }
};

export const getSinglePost: RequestHandler = async (req, res) => {
  const { postId } = req.params;
  if (!postId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Post not found' });

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },

      select: {
        author: {
          select: {
            username: true,
            avatar: true,
            name: true,
            location: true,
            posts: {
              take: 3,
              orderBy: { createdAt: 'desc' },
              select: {
                imageCoverUrl: true,
              },
            },
          },
        },
        title: true,
        description: true,
        imageCoverUrl: true,
        id: true,
        views: true,
        likes: true,
        comments: true,
        createdAt: true,
      },
    });

    return res.status(StatusCodes.OK).json({ post });
  } catch (error) {
    if (error instanceof Error)
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    else
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Something went wrong' });
  }
};

export const deletePost: RequestHandler = async (req: UserRequest, res) => {
  const { postId } = req.params;

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Post not found' });

    if (post.authorId !== req.user?.id)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Not authorized' });

    await cloudinary.v2.uploader.destroy(post.imagePublicId as string);

    await prisma.post.delete({ where: { id: postId } });

    res.status(StatusCodes.OK).json({ message: 'Post deleted' });
  } catch (error) {
    if (error instanceof Error)
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    else
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Something went wrong' });
  }
};

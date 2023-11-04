import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../utils/prisma';
import { hashPassword } from '../utils/encryptedData';
import { Follower, User, UserRequest } from '../types/types';
import cloudinary from 'cloudinary';
import * as fs from 'fs/promises';

export const getUser: RequestHandler = async (req: UserRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.params.username },
      select: {
        id: true,
        name: true,
        username: true,
        location: true,
        avatar: true,
        bio: true,
        link: true,
        email: true,
        followers: {
          select: {
            follower: {
              select: {
                id: true,
                username: true,
                name: true,
              },
            },
          },
        },
        following: {
          select: {
            following: {
              select: {
                id: true,
                username: true,
                name: true,
              },
            },
          },
        },
        posts: {
          orderBy: { createdAt: 'desc' },
          select: {
            author: {
              select: {
                username: true,
                name: true,
              },
            },
            id: true,
            imageUrl: true,
            imageCoverUrl: true,
            title: true,
            views: true,
            comments: true,
            likes: true,
            createdAt: true,
          },
        },
      },
    });

    let isFollowing = false;
    // check if the user is following the user

    // as any because error when follower.id when follower.follower.id is not correct but say it as correct type
    for (const follower of user?.followers! as any) {
      if (follower.id === req.user?.id) {
        isFollowing = true;
        break;
      }
    }

    const resUser = {
      ...user,
      isFollowing,
    };

    return res
      .status(StatusCodes.OK)
      .json({ message: 'User found', data: resUser });
  } catch (error) {
    if (error instanceof Error) return res.json({ message: error.message });
    else return res.json({ message: 'Something went wrong' });
  }
};

// ? GET ALL USERS
export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
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
        name: true,
        username: true,
        location: true,
        avatar: true,
        bio: true,
        link: true,
        email: true,
      },
    });

    res.status(StatusCodes.OK).json({ message: 'User found test', data: user });
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
export const updateUserCredentials: RequestHandler = async (
  req: UserRequest,
  res
) => {
  const { id } = req.user as User;
  const { email, username } = req.body;

  try {
    await prisma.user.update({
      where: { id: id as string },
      data: {
        email,
        username,
      },
    });

    res.status(StatusCodes.OK).json({ message: 'User credentials updated' });
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
    const user = await prisma.user.findUnique({
      where: { id: id as string },
    });

    if (user?.avatarPublicId)
      await cloudinary.v2.uploader.destroy(user?.avatarPublicId as string);

    await prisma.user.delete({ where: { id: id as string } });

    //! To add delete all posts of the user
    const posts = await prisma.post.findMany({ where: { authorId: id } });
    for (const post of posts) {
      await cloudinary.v2.uploader.destroy(post.imagePublicId as string);
    }
    await prisma.post.deleteMany({ where: { authorId: id } });

    res
      .clearCookie('jwt')
      .status(StatusCodes.OK)
      .json({ message: 'User deleted' });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

export const updateProfilePicture: RequestHandler = async (
  req: UserRequest,
  res
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id as string },
    });

    if (req.file) {
      const { path } = req.file;
      const response = await cloudinary.v2.uploader.upload(path);
      await fs.unlink(req.file.path);

      const updatedUser = await prisma.user.update({
        where: { id: req.user?.id as string },
        data: {
          avatar: response.secure_url,
          avatarPublicId: response.public_id,
        },
      });

      if (user?.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(user.avatarPublicId);
      }
    }

    res.status(StatusCodes.OK).json({ message: 'Profile picture updated' });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

export const deleteProfilePicture: RequestHandler = async (
  req: UserRequest,
  res
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id as string },
    });

    if (user?.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(user.avatarPublicId);
    }

    await prisma.user.update({
      where: { id: req.user?.id as string },
      data: {
        avatar: null,
        avatarPublicId: null,
      },
    });

    res.status(StatusCodes.OK).json({ message: 'Profile picture deleted' });
  } catch (error) {
    if (error instanceof Error) res.json({ message: error.message });
    else res.json({ message: 'Something went wrong' });
  }
};

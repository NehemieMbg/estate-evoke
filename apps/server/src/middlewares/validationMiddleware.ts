import { StatusCodes } from 'http-status-codes';
import { RequestHandler } from 'express';
import prisma from '../utils/prisma.js';

export const validateCreateUser: RequestHandler = async (req, res, next) => {
  const errors = [];

  const { email, firstName, lastName, password, confirmPassword } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!email) errors.push('Email is required');
  if (user) errors.push('Email already exists');
  if (!firstName) errors.push('First name is required');
  if (!lastName) errors.push('Last name is required');
  if (!password) errors.push('Password is required');
  if (!confirmPassword) errors.push('Confirm password is required');

  if (errors.length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: errors.join(', ') });
  }

  next();
};

export const validateUpdateUser: RequestHandler = async (req, res, next) => {
  const errors = [];

  const { firstName, lastName, bio, link } = req.body;

  if (!firstName) errors.push('First name is required');
  if (!lastName) errors.push('Last name is required');
  if (bio && typeof bio !== 'string') errors.push('Bio must be a string');
  if (bio && bio.length > 150)
    errors.push(
      `Bio must be less than 150 chars. Current length: ${bio.length}`
    );
  if (link && typeof link !== 'string') errors.push('Link must be a string');

  //! To add: check if link is a valid URL (Safe URL)

  if (errors.length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: errors.join(', ') });
  }

  next();
};

export const validateSignIn: RequestHandler = async (req, res, next) => {
  const errors = [];
  const { email, password } = req.body;

  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');

  if (errors.length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: errors.join(', ') });
  }

  next();
};

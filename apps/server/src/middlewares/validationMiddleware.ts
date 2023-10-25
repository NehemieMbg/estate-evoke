import { StatusCodes } from 'http-status-codes';
import { RequestHandler } from 'express';
import prisma from '../utils/prisma.js';
import { User, UserRequest } from '../types/types.js';
import { comparePassword } from '../utils/encryptedData.js';

//? Validates user data when creating it
export const validateCreateUser: RequestHandler = async (req, res, next) => {
  const errors = [];

  const { email, name, username, password, confirmPassword } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  const usernameExists = await prisma.user.findUnique({ where: { username } });

  if (!email) errors.push('Email is required');
  if (user) errors.push('Email already exists');
  if (usernameExists) errors.push('Username already exists');
  if (!name) errors.push('Name is required');
  if (!username) errors.push('Username is required');
  if (!password) errors.push('Password is required');
  if (!confirmPassword) errors.push('Confirm password is required');

  req.body.username = String(username).toLowerCase();
  req.body.email = String(email).toLowerCase() as string;

  if (errors.length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: errors.join(', ') });
  }

  next();
};

//? Validates user data when updating it
export const validateUpdateUser: RequestHandler = async (
  req: UserRequest,
  res,
  next
) => {
  const errors = [];

  const { name, bio, link } = req.body;
  const username = req.body.username.toLowerCase();

  const user = await prisma.user.findUnique({ where: { username } });

  if (!name) errors.push('Name is required');

  if (!username) errors.push('Username is required');
  if (user && req.user!.username !== user.username)
    errors.push('Username already exists');

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

//? Validates user email and password when logging in
export const validateSignIn: RequestHandler = async (req, res, next) => {
  const errors = [];
  let email = '';
  let username = '';
  const { identification, password } = req.body;

  if (!identification) errors.push('Email or username is required');

  if (String(identification).includes('@'))
    email = String(identification).toLowerCase();
  else username = String(identification).toLowerCase();

  if (!password) errors.push('Password is required');

  req.body.email = email;
  req.body.username = username;

  if (errors.length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: errors.join(', ') });
  }

  next();
};

//? Validates user email when updating it
export const validateUpdateEmail: RequestHandler = async (
  req: UserRequest,
  res,
  next
) => {
  const { id } = req.user as User;
  const { email } = req.body;

  if (!email)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Email is required' });

  const user = await prisma.user.findUnique({ where: { email } });

  // ? Check if email already exists and if it's not the user's email
  if (user && user.id !== id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Email already exists' });

  req.body.email = email.toLowerCase();

  next();
};

//? Validates user password when updating it
export const validateUpdatePassword: RequestHandler = async (
  req: UserRequest,
  res,
  next
) => {
  const { password, confirmPassword, newPassword } = req.body;
  const errors = [];
  const { id } = req.user as User;

  //? Check user inputs
  if (!password) errors.push('Password is required');
  if (!confirmPassword) errors.push('Confirm password is required');
  if (!newPassword) errors.push('New password is required');

  const user = await prisma.user.findUnique({ where: { id } });

  //? Check if old password is correct
  if (!(await comparePassword(password, user!.password))) {
    errors.push('Wrong credentials');
  }

  //? Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
    errors.push('Passwords do not match');
  }

  //? Return errors if any
  if (errors.length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: errors.join(', ') });
  }

  next();
};

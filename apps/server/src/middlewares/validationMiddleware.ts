import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validationResult, ValidationChain, body } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';
import prisma from '../utils/prisma.js';

const withValidationErrors = (
  validatesValue: ValidationChain | ValidationChain[]
): RequestHandler => {
  // Return a single RequestHandler function
  const validationMiddleware = Array.isArray(validatesValue)
    ? validatesValue
    : [validatesValue];

  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      const errorMessage = errorMessages.join(', ');
      console.log(errorMessages);

      throw new BadRequestError(errorMessage);
    }
    next();
  };
};

export const validateCreateUser = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid')
    .custom(async (email) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) throw new Error('Email already exists');
    }),
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .custom((firstName) => {
      if (typeof firstName !== 'string')
        throw new Error('First name must be a string');
    }),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .custom((lastName) => {
      if (typeof lastName !== 'string')
        throw new Error('Last name must be a string');
    }),
  body('password').notEmpty().withMessage('Password is required'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password)
        throw new Error('Passwords do not match');
    }),
]);

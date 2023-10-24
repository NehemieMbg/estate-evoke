import { Request } from 'express';

export type User = {
  id: string;
  email: string;
  bio: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserRequest = Request & { user?: User };

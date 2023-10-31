import { Post } from './post-type';

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  location: string;
  role: string;
  avatar: string;
  bio: string;
  link: string;
  posts: Post[];
  password: string;
  createdAt: string;
  updatedAt: string;
};

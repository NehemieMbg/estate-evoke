import { Post } from './post-type';

export type Follower = {
  id: string;
  username: string;
  name: string;
};

export type User = {
  id: string;
  randomId: string;
  name: string;
  email: string;
  username: string;
  location: string;
  role: string;
  avatar: string;
  bio: string;
  link: string;
  posts: Post[];
  followers: Follower[];
  following: Follower[];
  password: string;
  createdAt: string;
  updatedAt: string;
  isFollowing: boolean;
};

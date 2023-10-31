import { User } from './user-type';

export type Post = {
  id: string;
  author: User;
  title: string;
  description: string;
  imageUrl: string;
  imageCoverUrl: string;
  likes: number;
  comments: number;
  createdAt: string;
  user: {
    id: string;
    username: string;
    image: string;
  };
};

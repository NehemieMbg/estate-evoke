export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio: string;
  link: string;
  posts: Post[];
  password: string;
  createdAt: string;
  updatedAt: string;
};

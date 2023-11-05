import customFetch from '../customFetch';
import { AxiosError } from 'axios';

export const followingPostsLoader = async () => {
  try {
    const {
      data: { post: posts },
    } = await customFetch.get('/posts/following');

    return posts;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data.message;
    return 'Something went wrong';
  }
};

import customFetch from '../customFetch';
import { AxiosError } from 'axios';

export const postsLoader = async () => {
  try {
    const {
      data: { post: posts },
    } = await customFetch.get('/posts');

    return posts;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data.message;
    return 'Something went wrong';
  }
};

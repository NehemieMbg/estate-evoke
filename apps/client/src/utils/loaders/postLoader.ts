import { ActionFunctionArgs } from 'react-router-dom';
import customFetch from '../customFetch';
import { AxiosError } from 'axios';

export const postLoader = async ({ params }: ActionFunctionArgs) => {
  const { postId } = params;
  try {
    const {
      data: { post: post },
    } = await customFetch.get(`/posts/${postId}`);

    return post;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data.message;
    return 'Something went wrong';
  }
};

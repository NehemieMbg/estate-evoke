import { ActionFunctionArgs } from 'react-router-dom';
import customFetch from '../customFetch';
import { AxiosError } from 'axios';

export const profileWorkLoader = async ({ params }: ActionFunctionArgs) => {
  try {
    const {
      data: {
        data: { posts },
      },
    } = await customFetch.get(`/users/user/${params.username}`);
    return posts || null;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data.message;
    return 'Something went wrong';
  }
};

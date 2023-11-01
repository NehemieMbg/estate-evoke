import { ActionFunctionArgs, redirect } from 'react-router-dom';
import customFetch from '../customFetch';
import { AxiosError } from 'axios';

export const profileLoader = async ({ params }: ActionFunctionArgs) => {
  try {
    const {
      data: { data: user },
    } = await customFetch.get(`/users/user/${params.username}`);
    if (!user) return redirect('/');
    return user || null;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data.message;
    return 'Something went wrong';
  }
};

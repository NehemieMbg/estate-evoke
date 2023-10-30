import { ActionFunctionArgs, redirect } from 'react-router-dom';
import customFetch from '../customFetch';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const designAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  try {
    await customFetch.post('/posts', formData);
    toast.success('Design uploaded successfully');
    return redirect('/');
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data.message;
    return error;
  }
};

import { ActionFunctionArgs, redirect } from 'react-router-dom';
import customFetch from '../customFetch';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const passwordAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  try {
    await customFetch.patch('/users/user/credentials/password', data);
    toast.success('Password updated successfully');
    return redirect('.');
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data.message;
    return error;
  }
};

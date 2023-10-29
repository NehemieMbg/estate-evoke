import { ActionFunctionArgs, redirect } from 'react-router-dom';
import customFetch from '../customFetch';
import { AxiosError } from 'axios';

export const editProfileAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  redirect('.');
  try {
    const response = await customFetch.put('/users/user', data);
    console.log(response);

    return response;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data.message;
    return error;
  }
};

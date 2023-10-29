import { redirect } from 'react-router-dom';
import customFetch from '../customFetch';
import { AxiosError } from 'axios';
import { setUser } from '../../redux/reducers/auth-reducer';
import { store } from '../../redux/store';

export const deleteUserAction = async () => {
  try {
    await customFetch.delete('/users/user');
    store.dispatch(setUser(null));
    return redirect('/');
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;
    return error;
  }
};

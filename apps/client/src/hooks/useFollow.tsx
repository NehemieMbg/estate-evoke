import { AxiosError } from 'axios';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';
import useSession from './useSession';

const useFollow = () => {
  const navigate = useNavigate();
  const { isLoggedIn, openLogin } = useSession();

  const handleFollowing = async (id: string) => {
    if (!isLoggedIn) return openLogin();
    try {
      await customFetch.post(`/follows/${id}`);
      navigate('.');
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
      return 'Something went wrong';
    }
  };

  const handleUnfollowing = async (id: string) => {
    if (!isLoggedIn) return openLogin();
    try {
      await customFetch.delete(`/follows/${id}`);
      navigate('.');
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
      return 'Something went wrong';
    }
  };

  return [handleFollowing, handleUnfollowing];
};

export default useFollow;

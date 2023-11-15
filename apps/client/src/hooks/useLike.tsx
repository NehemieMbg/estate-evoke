import { AxiosError } from 'axios';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';
import useSession from './useSession';

const useLike = () => {
  const navigate = useNavigate();
  const { isLoggedIn, openLogin } = useSession();

  const handleLike = async (id: string) => {
    if (!isLoggedIn) return openLogin();

    try {
      await customFetch.post(`/likes/${id}`);
      navigate('.');
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
      return 'Something went wrong';
    }
  };

  const handleUnlike = async (id: string) => {
    if (!isLoggedIn) return openLogin();

    try {
      await customFetch.delete(`/likes/${id}`);
      navigate('.');
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
      return 'Something went wrong';
    }
  };

  return [handleLike, handleUnlike];
};

export default useLike;

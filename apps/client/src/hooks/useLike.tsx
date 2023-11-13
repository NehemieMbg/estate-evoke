import { AxiosError } from 'axios';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';

const useLike = () => {
  const navigate = useNavigate();

  const handleLike = async (id: string) => {
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

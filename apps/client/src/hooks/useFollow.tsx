import { AxiosError } from 'axios';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';

const useFollow = () => {
  const navigate = useNavigate();

  const handleFollowing = async (id: string) => {
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

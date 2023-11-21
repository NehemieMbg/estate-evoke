import customFetch from '../customFetch';
// import { store } from '../../redux/store';
// import { setUser } from '../../redux/reducers/auth-reducer';

export const homeLoader = async () => {
  try {
    const {
      data: { data },
    } = await customFetch.get('/users/user');

    // store.dispatch(setUser(data));

    return data || null;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Something went wrong';
  }
};

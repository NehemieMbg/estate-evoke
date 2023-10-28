import { setUser } from '../redux/reducers/auth-reducer';
import { store } from '../redux/store';
import customFetch from './customFetch';

export const clearsInputRef = (
  ...inputRefs: React.RefObject<HTMLInputElement>[]
) => {
  inputRefs.forEach((inputRef) => {
    inputRef.current!.value = '';
  });
};

export const handleSignUpErrors = (
  errorString: string,
  setErrorMsg: React.Dispatch<
    React.SetStateAction<{
      name: string;
      username: string;
      email: string;
      password: string;
    }>
  >
) => {
  const errors = errorString.split(', ');
  setErrorMsg({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  for (const error of errors) {
    if (
      error.toLocaleLowerCase().includes('name') &&
      !error.toLocaleLowerCase().includes('username')
    )
      setErrorMsg((prev) => ({ ...prev, name: error }));

    if (error.toLocaleLowerCase().includes('username'))
      setErrorMsg((prev) => ({ ...prev, username: error }));

    if (error.toLocaleLowerCase().includes('email'))
      setErrorMsg((prev) => ({ ...prev, email: error }));

    if (error.toLocaleLowerCase().includes('password'))
      setErrorMsg((prev) => ({ ...prev, password: error }));
  }
};

export const logout = async () => {
  try {
    const response = await customFetch.get('/auth/sign-out');
    store.dispatch(setUser(null));
    return response;
  } catch (error) {
    if (error instanceof Error) return error;
    return error;
  }
};

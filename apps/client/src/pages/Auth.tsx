import { SignIn, SignUp } from '../components';
import { useSelector } from 'react-redux';
import { AuthState } from '../types/reducers-types';

const Auth = () => {
  const auth = useSelector((state: { auth: AuthState }) => state.auth);

  return (
    <>
      {auth.loginModal && <SignIn />}
      {auth.registerModal && <SignUp />}
    </>
  );
};
export default Auth;

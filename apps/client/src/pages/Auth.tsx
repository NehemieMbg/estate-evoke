import { SignIn, SignUp } from '../components';
import { useSelector } from 'react-redux';
import { AuthState } from '../types/reducers-types';

const Auth = () => {
  const auth = useSelector((state: { auth: AuthState }) => state.auth);
  console.log(auth);
  // Switch between SignIn and SignUp
  // Open the right modal dynamically
  // remove the backdrop when the modal is closed
  // remove the backdrop for the modals and add it to the auth page

  // Creating a function to handle the switch between SignIn and SignUp

  return (
    <>
      {auth.loginModal && <SignIn />}
      {auth.registerModal && <SignUp />}
    </>
  );
};
export default Auth;

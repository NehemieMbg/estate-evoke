import { SignIn, SignUp } from '../components';

const Auth = () => {
  // Switch between SignIn and SignUp
  // Open the right modal dynamically
  // remove the backdrop when the modal is closed
  // remove the backdrop for the modals and add it to the auth page
  return <>{<SignIn /> || <SignUp />}</>;
};
export default Auth;

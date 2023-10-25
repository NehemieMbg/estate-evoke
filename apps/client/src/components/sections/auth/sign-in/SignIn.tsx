import { Link } from 'react-router-dom';
import { auth } from '../../../../constants';
import AuthBtn from '../../../buttons/AuthBtn';
import AuthInputs from '../../../inputs/AuthInputs';

const SignIn = () => {
  const { signIn } = auth;
  return (
    <div className="fixed backdrop flex items-center justify-center top-0 left-0 bottom-0 right-0 w-screen h-screen">
      <div className="relative auth-container">
        <h1 className="text-center mb-10 text-[24px] font-medium">
          {signIn.label}
        </h1>
        <form action="" className="w-full flex flex-col items-center gap-8">
          <AuthInputs />
          <AuthInputs />
          <AuthBtn />
        </form>

        <div className="flex justify-center mt-6">
          <p className="mx-auto flex gap-2 font-light text-sm">
            <span>{signIn.noAccountLabel}</span>
            <Link to="/sign-up" className="text-blue-500 underline font-normal">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignIn;

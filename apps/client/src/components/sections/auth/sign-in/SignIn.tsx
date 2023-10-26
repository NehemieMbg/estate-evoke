import { Link } from 'react-router-dom';
import { auth } from '../../../../constants';
import AuthBtn from '../../../buttons/AuthBtn';
import AuthInputs from '../../../inputs/AuthInputs';
import { XMarkIcon } from '@heroicons/react/20/solid';

const SignIn = () => {
  const { signIn } = auth;

  return (
    <div className="fixed backdrop flex items-center justify-center top-0 left-0 bottom-0 right-0 w-screen h-screen">
      <div className="relative auth-container">
        <button className="absolute flex gap-2 items-center top-6 right-6 pb-10 font-roboto font-light">
          <XMarkIcon className="w-11 text-black hover:bg-neutral-100 transition-colors duration-200 rounded-full p-2" />
        </button>
        <h1 className=" mb-10 text-2xl font-semibold">{signIn.label}</h1>
        <form action="" className="w-full flex flex-col items-center gap-8">
          <AuthInputs
            label="Email or Username"
            type="text"
            name="identification"
          />
          <AuthInputs
            label="Password"
            name="password"
            type="password"
            link=""
            linkLabel="Forgot ?"
          />
          <AuthBtn label="Sign In" type="submit" />
        </form>

        <div className="flex justify-center mt-6">
          <p className="mx-auto flex gap-2 font-light text-sm">
            <span>{signIn.noAccountLabel}</span>
            <Link to="/sign-up" className=" underline font-normal">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignIn;

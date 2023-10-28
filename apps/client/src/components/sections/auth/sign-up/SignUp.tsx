import { auth } from '../../../../constants';
import AuthBtn from '../../../buttons/AuthBtn';
import AuthInputs from '../../../inputs/AuthInputs';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useRef, useState } from 'react';
import customFetch from '../../../../utils/customFetch';
import {
  clearsInputRef,
  handleSignUpErrors,
} from '../../../../utils/functions';
import { AxiosError } from 'axios';
import {
  openLoginModal,
  closeModals,
  setUser,
} from '../../../../redux/reducers/auth-reducer';
import { useDispatch } from 'react-redux';
import useClickOutside from '../../../../hooks/useClickOutside';

const SignUp = () => {
  const dispatch = useDispatch();
  const { signUp } = auth;

  const modalRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorsMsg, setErrorsMsg] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  console.log(errorsMsg);

  useClickOutside(modalRef, () => dispatch(closeModals()));

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    setIsLoading(true);

    const formData = {
      name,
      username,
      email,
      password,
    };

    try {
      const {
        data: { data: user },
      } = await customFetch.post('/auth/sign-up', formData);
      dispatch(setUser(user));
      clearsInputRef(nameRef, usernameRef, emailRef, passwordRef);
      setErrorsMsg({
        name: '',
        username: '',
        email: '',
        password: '',
      });
      dispatch(closeModals());
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorString = error.response?.data.message;
        handleSignUpErrors(errorString, setErrorsMsg);
      }
      // ! Add popup to show error messages: Something happened, try again later
      console.log(error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed backdrop flex items-center justify-center top-0 left-0 bottom-0 right-0 w-screen h-screen">
      <div ref={modalRef} className="relative auth-container">
        <button
          onClick={() => dispatch(closeModals())}
          className="absolute flex gap-2 items-center top-6 right-6 pb-10 font-roboto font-light"
        >
          <XMarkIcon className="w-11 text-black hover:bg-neutral-100 transition-colors duration-200 rounded-full p-2" />
        </button>

        <h1 className=" mb-10 text-3xl font-semibold font-exo">
          {signUp.label}
        </h1>

        <form
          action=""
          onSubmit={handleRegister}
          className="w-full flex flex-col items-center gap-8"
        >
          <div className="flex gap-4">
            <AuthInputs
              label="Name"
              type="text"
              name="name"
              error={errorsMsg.name}
              inputRef={nameRef}
            />
            <AuthInputs
              label="Username"
              type="text"
              name="username"
              error={errorsMsg.username}
              inputRef={usernameRef}
            />
          </div>
          <AuthInputs
            label="Email"
            type="email"
            name="email"
            error={errorsMsg.email}
            inputRef={emailRef}
          />
          <AuthInputs
            label="Password"
            name="password"
            type="password"
            error={errorsMsg.password}
            inputRef={passwordRef}
            placeholder="8+ characters"
          />
          <AuthBtn label="Create Account" type="submit" isLoading={isLoading} />
        </form>

        <div className="flex justify-center mt-6">
          <p className="mx-auto flex gap-2 font-light text-sm">
            <span>{signUp.alreadyAccountLabel}</span>
            <button
              onClick={() => dispatch(openLoginModal())}
              className=" underline font-normal"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;

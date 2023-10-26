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

import { useRef, useState } from 'react';
import { settingsPages } from '../../../constants';
import { FormBtn, FormInputs } from '../..';
import { useSelector } from 'react-redux';
import { User } from '../../../types/user-type';

const AccountManagement = () => {
  const user = useSelector(
    (state: { auth: { user: User } }) => state.auth.user
  );
  const manageAccount = settingsPages.manageAccount;

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState(user.username);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    setIsLoading(false);
  };

  return (
    <div className="font-roboto w-full">
      <h1 className="setting-title">{manageAccount.title}</h1>
      <p className="settings-description">{manageAccount.description}</p>

      <form onSubmit={handleUpdate} className="w-full flex flex-col gap-6">
        <FormInputs
          label="Username*"
          name="username"
          type="text"
          required
          defaultValue={user.username}
          onChange={(e) => setUsername(e.target.value)}
          inputRef={usernameRef}
          underText={`Your evoke-estate URL: https://evoke-estate/${username}`}
        />
        <FormInputs
          label="Email*"
          name="email"
          type="email"
          defaultValue={user.email}
          inputRef={emailRef}
          required
          underText="Your email remains confidential and will not be shared or viewed publicly."
        />
        <div className="flex justify-end">
          <FormBtn label="Save changes" type="submit" isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};
export default AccountManagement;

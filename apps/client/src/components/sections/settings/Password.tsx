import { useRef, useState } from 'react';
import { settingsPages } from '../../../constants';
import { FormBtn, FormInputs } from '../..';

const Password = () => {
  const { password } = settingsPages;

  const passwordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    setIsLoading(false);
  };

  return (
    <div className="font-roboto">
      <h1 className="setting-title">{password.title}</h1>
      <p className="settings-description">{password.description}</p>

      <form
        onSubmit={handlePasswordUpdate}
        className="w-full flex flex-col gap-6"
      >
        <FormInputs
          label="Current password*"
          name="password"
          type="password"
          inputRef={passwordRef}
          required
        />
        <FormInputs
          label="New password*"
          name="newPassword"
          type="password"
          inputRef={newPasswordRef}
          underText="Must be at least 8 characters long and contain at least one number and one special character."
          required
        />

        <div className="flex justify-end">
          <FormBtn
            label="Update password"
            type="submit"
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};
export default Password;

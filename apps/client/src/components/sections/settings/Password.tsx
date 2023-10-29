import { useEffect, useRef, useState } from 'react';
import { settingsPages } from '../../../constants';
import { FormBtn, FormInputs } from '../..';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { clearsInputRef, setPasswordError } from '../../../utils/functions';

const Password = () => {
  const { password } = settingsPages;
  const errorsMsg = useActionData();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';

  const passwordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState({
    password: '',
    newPassword: '',
  });

  useEffect(() => {
    if (typeof errorsMsg === 'string') {
      setPasswordError(errorsMsg, setErrors);
    } else {
      setErrors({
        password: '',
        newPassword: '',
      });

      clearsInputRef(passwordRef, newPasswordRef);
    }
  }, [errorsMsg, setErrors]);

  return (
    <div className="font-roboto">
      <h1 className="setting-title">{password.title}</h1>
      <p className="settings-description">{password.description}</p>

      <Form method="patch" className="w-full flex flex-col gap-6">
        <FormInputs
          label="Current password*"
          name="password"
          type="password"
          inputRef={passwordRef}
          error={errors.password}
          required
        />
        <FormInputs
          label="New password*"
          name="newPassword"
          type="password"
          inputRef={newPasswordRef}
          error={errors.newPassword}
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
      </Form>
    </div>
  );
};
export default Password;

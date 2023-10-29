import { useEffect, useState } from 'react';
import { settingsPages } from '../../../constants';
import { FormBtn, FormInputs } from '../..';
import { useSelector } from 'react-redux';
import { User } from '../../../types/user-type';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { setManageAccountError } from '../../../utils/functions';

const AccountManagement = () => {
  const errorsMsg = useActionData();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';

  const [errors, setErrors] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    if (typeof errorsMsg === 'string') {
      setManageAccountError(errorsMsg, setErrors);
    } else {
      setErrors({
        username: '',
        email: '',
      });
    }
  }, [errorsMsg, setErrors]);

  const user = useSelector(
    (state: { auth: { user: User } }) => state.auth.user
  );
  const manageAccount = settingsPages.manageAccount;

  const [username, setUsername] = useState(user.username);

  return (
    <div className="font-roboto w-full">
      <h1 className="setting-title">{manageAccount.title}</h1>
      <p className="settings-description">{manageAccount.description}</p>

      <Form method="patch" className="w-full flex flex-col gap-6">
        <FormInputs
          label="Username*"
          name="username"
          type="text"
          required
          error={errors.username}
          defaultValue={user.username}
          onChange={(e) => setUsername(e.target.value.toLocaleLowerCase())}
          underText={`Your evoke-estate URL: https://evoke-estate/${username}`}
        />
        <FormInputs
          label="Email*"
          name="email"
          type="email"
          error={errors.email}
          defaultValue={user.email}
          required
          underText="Your email remains confidential and will not be shared or viewed publicly."
        />
        <div className="flex justify-end">
          <FormBtn label="Save changes" type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </div>
  );
};
export default AccountManagement;

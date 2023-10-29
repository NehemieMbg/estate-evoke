import { AvatarInput, BioInput, FormBtn, FormInputs } from '../..';
import { settingsPages } from '../../../constants';
import { useSelector } from 'react-redux';
import { User } from '../../../types/user-type';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setEditProfileErrors } from '../../../utils/functions';

const EditProfile = () => {
  const errorsMsg = useActionData();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';

  const [errors, setErrors] = useState({
    name: '',
    location: '',
    bio: '',
    link: '',
  });

  useEffect(() => {
    if (typeof errorsMsg === 'string') {
      setEditProfileErrors(errorsMsg, setErrors);
    } else {
      setErrors({
        name: '',
        location: '',
        bio: '',
        link: '',
      });
    }
  }, [errorsMsg, setErrors]);

  const { editProfile } = settingsPages;
  const user = useSelector(
    (state: { auth: { user: User } }) => state.auth.user
  );

  return (
    <div className="font-roboto">
      <h1 className="setting-title">{editProfile.title}</h1>
      <p className="settings-description">{editProfile.description}</p>

      <Form method="post" className="flex flex-col gap-6 m-1">
        <AvatarInput />
        <FormInputs
          label="Name*"
          type="text"
          name="name"
          error={errors.name}
          defaultValue={user?.name}
          required
        />
        <FormInputs
          label="Location"
          type="text"
          name="location"
          error={errors.location}
          defaultValue={user?.location}
          underText='Where in the world are you? (e.g. "Seattle, WA")'
        />
        <BioInput
          name="bio"
          label="Bio"
          error={errors.bio}
          defaultValue={user.bio}
          underText="Tell us a little bit about yourself."
        />
        <FormInputs
          label="Personal website"
          type="text"
          name="link"
          error={errors.link}
          defaultValue={user?.link}
          underText="Your home page, blog, or company site."
        />
        <div className="flex justify-end">
          <FormBtn label="Save profile" type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </div>
  );
};
export default EditProfile;

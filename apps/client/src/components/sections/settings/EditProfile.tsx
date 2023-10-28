import { useRef, useState } from 'react';
import { AvatarInput, BannerInput, BioInput, FormBtn, FormInputs } from '../..';
import { settingsPages } from '../../../constants';
import { useSelector } from 'react-redux';
import { User } from '../../../types/user-type';

const EditProfile = () => {
  const { editProfile } = settingsPages;
  const user = useSelector(
    (state: { auth: { user: User } }) => state.auth.user
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const location = locationRef.current?.value;
    const link = linkRef.current?.value;
    const bio = bioRef.current?.value;

    setIsLoading(true);

    console.log(name, location, link, bio);
    setIsLoading(false);
  };

  return (
    <div className="font-roboto">
      <h1 className="setting-title">{editProfile.title}</h1>
      <p className="settings-description">{editProfile.description}</p>

      <form onSubmit={handleUpdateProfile} className="flex flex-col gap-6 m-1">
        <BannerInput />
        <AvatarInput />
        <FormInputs
          label="Name*"
          type="text"
          name="name"
          error=""
          inputRef={nameRef}
          defaultValue={user?.name}
          required
        />
        <FormInputs
          label="Location"
          type="text"
          name="location"
          error=""
          inputRef={locationRef}
          defaultValue={user?.location}
        />
        <BioInput
          name="bio"
          label="Bio"
          defaultValue={user.bio}
          inputRef={bioRef}
          underText="Tell us a little bit about yourself."
        />
        <FormInputs
          label="Personal website"
          type="text"
          name="link"
          error=""
          inputRef={linkRef}
          defaultValue={user?.link}
          underText="Your home page, blog, or company site."
        />
        <div className="flex justify-end">
          <FormBtn label="Save profile" type="submit" isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};
export default EditProfile;

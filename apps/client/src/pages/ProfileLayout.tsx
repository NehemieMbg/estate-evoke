import { ProfileInfo, ProfileNavigation } from '../components';
import { User } from '../types/user-type';
import { Outlet, useLoaderData } from 'react-router-dom';

const ProfileLayout = () => {
  const user = useLoaderData() as User;

  return (
    (
      <section className="relative w-full px-12 py-16 max-xl:px-10 max-xl:py-14 max-lg:px-8 max-md:px-6 max-sm:px-4 flex flex-col gap-12 profile bg-white">
        <ProfileInfo user={user} />

        <div className="relative w-full">
          <ProfileNavigation />
          <Outlet />
        </div>
      </section>
    ) || null
  );
};
export default ProfileLayout;

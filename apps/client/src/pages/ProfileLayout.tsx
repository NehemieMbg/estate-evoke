import { ProfileInfo } from '../components';
import { User } from '../types/user-type';
import { Link, Outlet, useLoaderData } from 'react-router-dom';

const ProfileLayout = () => {
  const user = useLoaderData() as User;

  return (
    (
      <section className="relative w-full px-12 py-16 flex flex-col gap-12 profile bg-white">
        <ProfileInfo user={user} />

        <div className="w-full py-6">
          <div className="mb-6">
            <Link
              to={`/${user.username}`}
              className="font-exo text-sm bg-black text-white px-4 py-2 rounded-full"
            >
              Work
            </Link>
          </div>
          <Outlet />
        </div>
      </section>
    ) || null
  );
};
export default ProfileLayout;

import { User } from '../types/user-type';
import { Link, Outlet, useLoaderData } from 'react-router-dom';

const ProfileLayout = () => {
  const user = useLoaderData() as User;

  return (
    (
      <section className="relative w-full px-12 py-16 flex gap-12 profile bg-neutral-100">
        <div className="flex flex-col items-center gap-3 w-full max-w-[360px] h-max bg-white p-6 rounded-sm font-roboto text-[15px]">
          <div className="w-28 aspect-square rounded-full bg-neutral-200 overflow-hidden">
            {user.avatar && (
              <img
                src={user.avatar}
                alt=""
                className="object-cover object-center"
              />
            )}
          </div>

          <div className="flex flex-col items-center leading-tight">
            <h2 className="text-2xl font-exo font-medium">{user.name}</h2>
            <p>{user.username}</p>
            {user.link && (
              <a
                href={user.link}
                target="_blank"
                className="text-neutral-700  underline"
              >
                {user.link.slice(8, 30)}
                {user.link.length > 30 ? '...' : ''}
              </a>
            )}
          </div>

          <p className="text-[15px] text-center font-normal">{user.bio}</p>

          <p className="text-[15px] text-neutral-600">{user.location}</p>
        </div>

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

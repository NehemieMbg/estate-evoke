import { useSelector } from 'react-redux';
import { User } from '../types/user-type';
import { Link, Outlet } from 'react-router-dom';

const ProfileLayout = () => {
  const user = useSelector(
    (state: { auth: { user: User } }) => state.auth.user
  );
  return (
    <section className="w-full profile bg-neutral-100">
      <div className="h-[228px] w-full bg-neutral-200 overflow-hidden">
        <img
          src="/bg-profile.jpg"
          alt=""
          className="object-cover object-center w-full"
        />
      </div>

      <div className="relative flex gap-4">
        <div className="relative w-full max-w-[408px]">
          <div className="absolute -top-40 left-12 flex flex-col items-center gap-4 w-[360px] bg-white p-6 rounded-sm font-roboto text-[15px]">
            <div className="w-28 aspect-square rounded-full bg-neutral-200 overflow-hidden">
              <img
                src={user.avatar}
                alt=""
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col items-center">
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
        </div>

        <div className="w-full p-6">
          <div className="mb-6">
            <Link
              to={`/${user.username}`}
              className="font-exo text-sm bg-black text-white px-4 py-2 rounded-full font-light"
            >
              Work
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};
export default ProfileLayout;

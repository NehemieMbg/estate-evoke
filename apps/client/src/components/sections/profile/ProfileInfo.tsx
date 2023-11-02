import { ChevronRightIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { User } from '../../../types/user-type';
import { Link } from 'react-router-dom';
import { PencilIcon, PlusIcon } from '@heroicons/react/20/solid';
import { useSelector } from 'react-redux';

type ProfileInfoProps = {
  user: User;
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const { username } = useSelector(
    (state: { auth: { user: User } }) => state.auth.user
  );

  return (
    <div className="w-full max-w-screen-normal mx-auto flex gap-6 max-[586px]:flex-col">
      <div className="w-28 h-28 aspect-square rounded-full bg-neutral-200 overflow-hidden">
        {user.avatar && (
          <img
            src={user.avatar}
            alt=""
            className="object-cover object-center"
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-exo font-medium">{user.name}</h2>
        <div className="flex items-center gap-1.5 text-neutral-500 text-[15px]">
          <p>@{user.username}</p>
          <div className="flex items-center ">
            <MapPinIcon className="w-4" />
            <p>{user.location}</p>
          </div>
        </div>

        <Link
          to={'about'}
          className="text-sm flex items-center gap-2 text-neutral-500 hover:font-medium w-max"
        >
          <span>More about @{user.username}</span>
          <ChevronRightIcon className="w-4" strokeWidth={1.8} />
        </Link>

        {user.link && (
          <a
            href={user.link}
            target="_blank"
            className="text-neutral-500  underline text-[15px] w-max"
          >
            {user.link.slice(8, 30)}
            {user.link.length > 30 ? '...' : ''}
          </a>
        )}

        {username === user.username ? (
          <Link
            to={'/account/edit-profile'}
            className="bg-blue-600 hover:bg-opacity-90 transition-colors duration-200 rounded-full py-1.5 px-5 text-sm mt-2 text-white font-exo w-max flex items-center gap-1"
          >
            <PencilIcon className="h-4 text-white" />
            <span>Edit your profile</span>
          </Link>
        ) : (
          <button className="bg-blue-600 hover:bg-opacity-90 transition-colors duration-200 rounded-full py-1.5 px-5 text-sm mt-2 text-white font-exo w-max flex items-center gap-1">
            <PlusIcon className="h-5 text-white" />
            <span>Follow</span>
          </button>
        )}
      </div>
    </div>
  );
};
export default ProfileInfo;

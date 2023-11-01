import { ChevronRightIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { User } from '../../../types/user-type';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/20/solid';

type ProfileInfoProps = {
  user: User;
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  return (
    <div className="w-full max-w-screen-normal mx-auto flex gap-6">
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
        <div className="flex items-center gap-4 text-neutral-500 text-[15px]">
          <p>@{user.username}</p>
          <div className="flex items-center gap-1">
            <MapPinIcon className="w-4" />
            <p>{user.location}</p>
          </div>
        </div>
        {user.link && (
          <a
            href={user.link}
            target="_blank"
            className="text-neutral-500  underline text-[15px]"
          >
            {user.link.slice(8, 30)}
            {user.link.length > 30 ? '...' : ''}
          </a>
        )}
        <Link
          to={'.'}
          className="text-sm flex items-center gap-2 text-neutral-500"
        >
          <span>More about @{user.username}</span>
          <ChevronRightIcon className="w-4" />
        </Link>

        <button className="bg-blue-500 rounded-full py-1.5 px-5 text-sm mt-1.5 text-white font-exo w-max flex items-center gap-1">
          <PlusIcon className="w-4 text-white" />
          <span>Follow</span>
        </button>
      </div>
    </div>
  );
};
export default ProfileInfo;

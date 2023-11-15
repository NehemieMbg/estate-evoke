import { HeartIcon, UsersIcon } from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';
import { Stories } from '../..';

const HomeNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  return (
    <div>
      <Stories />

      <div className="font-inter mb-6 flex items-center gap-2 text-xs">
        <Link
          to={'.'}
          className={`py-2.5 flex items-center gap-1 border-b-[2px] border-transparent w-max  transition-colors duration-100 hover:bg-neutral-200 font-medium px-5 rounded-md
		  ${!currentPath ? 'w-max bg-neutral-200 font-medium' : 'text-neutral-900'}
		  `}
        >
          <HeartIcon className="w-4 h-4" />
          <span>For You</span>
        </Link>

        <Link
          to={'following'}
          className={`py-2.5 flex items-center gap-1 border-b-[2px] border-transparent w-max  transition-colors duration-100 hover:bg-neutral-200 font-medium px-5 rounded-md
		  ${
        currentPath === 'following'
          ? 'w-max bg-neutral-200 font-medium'
          : 'text-neutral-900'
      }
		  `}
        >
          <UsersIcon className="w-4 h-4" strokeWidth={2} />
          <span>Following</span>
        </Link>
      </div>
    </div>
  );
};
export default HomeNavigation;

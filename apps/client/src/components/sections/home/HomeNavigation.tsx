import { HeartIcon, UsersIcon } from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconSolid,
  UsersIcon as UsersIconSolid,
} from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';

const HomeNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2];
  console.log(currentPath);

  return (
    <div className="border-b border-b-neutral-150 font-exo  mb-10 max-lg:mb-8  flex items-center gap-6">
      <Link
        to={'.'}
        className={`py-2.5 flex items-center gap-1 border-b-[2px] border-transparent w-max  transition-colors duration-200 hover:border-b-neutral-500 hover:font-medium
		  ${
        !currentPath
          ? 'border-b-[2px] text-black w-max border-b-black font-medium'
          : 'text-neutral-500'
      }
		  `}
      >
        {!currentPath ? (
          <HeartIconSolid className="w-5" />
        ) : (
          <HeartIcon className="w-5" />
        )}
        <span>For You</span>
      </Link>

      <div className="text-neutral-300">|</div>

      <Link
        to={'following'}
        className={`py-2.5 flex items-center gap-2 border-b-[2px] border-transparent w-max  transition-colors duration-200 hover:border-b-neutral-500 hover:font-medium
		  ${
        currentPath === 'following'
          ? 'border-b-[2px] text-black w-max border-b-black font-medium'
          : 'text-neutral-500'
      }
		  `}
      >
        {currentPath === 'following' ? (
          <UsersIconSolid className="w-5" />
        ) : (
          <UsersIcon className="w-5" strokeWidth={2} />
        )}
        <span>Following</span>
      </Link>
    </div>
  );
};
export default HomeNavigation;

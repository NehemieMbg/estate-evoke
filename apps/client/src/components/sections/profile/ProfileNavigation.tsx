import {
  BriefcaseIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import {
  BriefcaseIcon as BriefcaseIconSolid,
  InformationCircleIcon as InformationCircleIconSolid,
} from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';

const ProfileNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2];
  console.log(currentPath);

  return (
    <div className=" bg-white border-b border-b-neutral-150 font-exo  mb-10 max-lg:mb-8  flex items-center gap-6">
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
          <BriefcaseIconSolid className="w-5" />
        ) : (
          <BriefcaseIcon className="w-5" />
        )}
        <span>Work</span>
      </Link>

      <div className="text-neutral-300">|</div>

      <Link
        to={'about'}
        className={`py-2.5 flex items-center gap-2 border-b-[2px] border-transparent w-max  transition-colors duration-200 hover:border-b-neutral-500 hover:font-medium
		${
      currentPath === 'about'
        ? 'border-b-[2px] text-black w-max border-b-black font-medium'
        : 'text-neutral-500'
    }
		`}
      >
        {currentPath === 'about' ? (
          <InformationCircleIconSolid className="w-5" />
        ) : (
          <InformationCircleIcon className="w-5" strokeWidth={2} />
        )}
        <span>About</span>
      </Link>
    </div>
  );
};
export default ProfileNavigation;

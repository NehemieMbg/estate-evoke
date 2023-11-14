import { Link, useLocation } from 'react-router-dom';
import { Logo } from '..';

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  return (
    <div className="fixed flex items-center gap-2 bottom-3 left-1/2 translate-x-[-50%] bg-neutral-900 bg-opacity-80 backdrop-blur-sm text-white p-1.5 rounded-lg">
      <div className="bg-black rounded-md w-max py-2.5 px-4">
        <Logo />
      </div>

      <div className="bg-white py-[11px] text-neutral-900 rounded-md">
        <Link
          to={'/'}
          className={`relative text-[14px] py-[15px] px-4 hover:font-semibold transition-all duration-200 font-light
	${(!currentPath || currentPath === 'following') && 'font-semibold'}
  `}
        >
          <span>For You</span>
          {(!currentPath || currentPath === 'following') && (
            <div className="absolute top-9 left-1/2 w-0.5 h-0.5 rounded-full bg-black"></div>
          )}
        </Link>
      </div>
    </div>
  );
};
export default Navigation;

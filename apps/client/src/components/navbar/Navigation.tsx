import { Link, useLocation } from 'react-router-dom';
import { Logo } from '..';

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  return (
    <div className="fixed py-3.5 px-5 flex items-center gap-6 bottom-3 left-1/2 translate-x-[-50%] bg-neutral-900 bg-opacity-80 backdrop-blur-sm text-white  rounded-md">
      <div className=" w-max ">
        <Logo sm />
      </div>

      <div className=" rounded-md">
        <Link
          to={'/'}
          className={`relative text-sm  rounded-md hover:font-medium transition-all duration-200 font-light
	${(!currentPath || currentPath === 'following') && ' font-medium'}
  `}
        >
          <span className="shadow-sm">For You</span>
          {(!currentPath || currentPath === 'following') && (
            <div className="absolute top-5 left-1/2 w-[2px] h-[2px] rounded-full bg-white"></div>
          )}
        </Link>
      </div>
    </div>
  );
};
export default Navigation;

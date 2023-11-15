import { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { ArrowDownLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useSession from '../../hooks/useSession';
import { logout } from '../../utils/functions';

type MenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

const Menu: React.FC<MenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { user, isLoggedIn, openLogin, openRegister } = useSession();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split('/')[1];
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setIsMenuOpen(false));

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`backdrop-search
 		   transition-all duration-200 lg:hidden
			${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
 `}
      ></div>

      <div
        ref={menuRef}
        className={`fixed font-inter z-[100] p-6 pt-20  lg:hidden w-2/3 max-md:w-full top-0 left-0 h-screen bg-white transition-transform duration-200
	${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
	`}
      >
        <XMarkIcon
          className="absolute cursor-pointer top-5 right-6 h-8 w-8 text-black"
          onClick={() => setIsMenuOpen(false)}
        />

        <div className="flex flex-col h-full gap-6 text-lg">
          <Link
            to={'/'}
            onClick={() => setIsMenuOpen(false)}
            className={`text-lg text-black flex gap-2 items-center
			${(!currentPath || currentPath === 'following') && ' font-medium'}
			`}
          >
            <span>For You</span>
            {(!currentPath || currentPath === 'following') && (
              <ArrowDownLeftIcon className="h-5 text-black" strokeWidth={2} />
            )}
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to={`/${user.username}`}
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </Link>
              <Link
                to={`/account/edit-profile`}
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
              <button className="w-max" onClick={handleLogout}>
                Sign Out
              </button>
            </>
          )}

          <div className="absolute bottom-6 right-6 flex  gap-6 text-sm">
            {!isLoggedIn && (
              <>
                {' '}
                <button
                  onClick={() => {
                    openLogin();
                    setIsMenuOpen(false);
                  }}
                  className="text-black w-max"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    openRegister();
                    setIsMenuOpen(false);
                  }}
                  className="text-white py-2.5 px-5 bg-black rounded-full"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Menu;

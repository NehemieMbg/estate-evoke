import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../types/user-type';
import { logout } from '../../utils/functions';
import { useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

type NavigationCardProps = {
  user: User;
};

const NavigationCard: React.FC<NavigationCardProps> = ({ user }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setMenu(false));

  const handleLogout = () => {
    logout();
    navigate('.');
  };

  return (
    <div className="max-lg:hidden">
      <div
        className={`backdrop
 		   transition-all duration-200
			${menu ? 'opacity-100 visible' : 'opacity-0 invisible'}
 `}
      ></div>
      <div className="z-99 relative font-exo">
        <div
          onClick={() => setMenu(true)}
          className="bg-neutral-300 h-9 cursor-pointer aspect-square rounded-full overflow-hidden"
        >
          {user.avatar && (
            <img
              src={user.avatar}
              alt={`${user.name} profile picture`}
              height={50}
              width={50}
            />
          )}
        </div>

        <div
          ref={menuRef}
          className={`absolute z-[99] bg-white border-[1px] border-neutral-300 w-80 right-0 mt-5 rounded-md
		   transition-all duration-200
		${menu ? 'opacity-100 visible' : 'opacity-0 invisible'}
	  `}
        >
          <Link
            to={`/${user.username}`}
            onClick={() => setMenu(false)}
            className="p-5 flex flex-col items-center mb-6"
          >
            <div className="bg-neutral-300 h-16 aspect-square rounded-full overflow-hidden mb-3">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={`${user.name} profile picture`}
                  className="object-center object-cover w-full"
                  height={50}
                  width={50}
                />
              )}
            </div>
            <h3 className="text-lg font-exo">{user.name}</h3>
            <p className="font-light">{user.email}</p>
          </Link>

          <div className="flex flex-col gap-3 p-5">
            <Link
              to={`/${user.username}`}
              onClick={() => setMenu(false)}
              className=" hover:text-neutral-600"
            >
              My profile
            </Link>
            <Link
              to={'/account/edit-profile'}
              onClick={() => setMenu(false)}
              className="hover:text-neutral-600"
            >
              Settings
            </Link>
          </div>

          <div className="p-5  border-t border-neutral-300">
            <button
              onClick={handleLogout}
              className="hover:text-neutral-600 transition-colors duration-200"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavigationCard;

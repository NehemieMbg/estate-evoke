import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  openLoginModal,
  openRegisterModal,
} from '../../redux/reducers/auth-reducer';
import { User } from '../../types/user-type';
import { NavigationCard } from '..';

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  const user = useSelector(
    (state: { auth: { user: User } }) => state.auth.user
  );

  return (
    <nav className="sticky z-[99] top-0 py-2.5 px-6 border-b-2 bg-white shadow-sm border-b-neutral-100 border-opacity-0 flex items-center justify-between">
      <div className="flex gap-6 items-center">
        <Link to={'/'} className="font-exo text-lg">
          evoke-estate
        </Link>

        <Link
          to={'/'}
          className={`relative font-exo text-[15px]
          ${
            (!currentPath || currentPath === 'following') &&
            'text-black font-medium'
          }
        `}
        >
          <span>For You</span>
          {(!currentPath || currentPath === 'following') && (
            <div className="absolute top-7 left-1/2 w-1 h-1 rounded-full bg-black"></div>
          )}
        </Link>
      </div>

      {/* <Search /> */}

      {!user ? (
        <>
          <div className="flex gap-6 items-center text-sm font-exo">
            <button onClick={() => dispatch(openLoginModal())}>Log in</button>
            <button
              onClick={() => dispatch(openRegisterModal())}
              className="text-white bg-black hover:opacity-90 transition-colors duration-200 py-2.5 px-5 rounded-full"
            >
              Sign up
            </button>
          </div>
        </>
      ) : (
        <div className="flex gap-6 items-center">
          <Link
            to={'/portfolio/new-design'}
            className=" font-exo text-sm bg-neutral-100 font-medium border border-neutral-200 text-neutral-500 py-1.5 px-3.5 rounded-full hover:opacity-90 transition-colors duration-200 hover:bg-neutral-200 "
          >
            Share design
          </Link>
          <NavigationCard user={user} />
        </div>
      )}
    </nav>
  );
};
export default Navbar;

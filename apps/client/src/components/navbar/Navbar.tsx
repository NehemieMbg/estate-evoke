import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  openLoginModal,
  openRegisterModal,
} from '../../redux/reducers/auth-reducer';
import { User } from '../../types/user-type';
import { Logo, Message, NavigationCard, Notifications, Search } from '..';
import { PlusIcon } from '@heroicons/react/24/outline';
import Navigation from './Navigation';

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector(
    (state: { auth: { user: User } }) => state.auth.user
  );

  return (
    <nav className="sticky z-[99] top-0 py-2.5 px-6 bg-white flex items-center justify-between font-inter gap-6">
      <Logo />

      <Search />

      <Navigation />

      {!user ? (
        <>
          <div className="flex gap-6 items-center text-sm whitespace-nowrap">
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
            className="text-sm font-light bg-black border border-neutral-200 text-white py-3 px-5 rounded-md hover:opacity-90 transition-colors duration-200 hover:bg-opacity-95 flex items-center gap-2 w-max"
          >
            <PlusIcon className="h-4" strokeWidth={2.5} />
            <span>New Design</span>
          </Link>

          <div className="flex items-center gap-4">
            <Message />
            <Notifications />
            <NavigationCard user={user} />
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;

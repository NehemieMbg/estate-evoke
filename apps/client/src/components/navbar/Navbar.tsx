import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  openLoginModal,
  openRegisterModal,
} from '../../redux/reducers/auth-reducer';
import { User } from '../../types/user-type';
import { NavigationCard } from '..';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(
    (state: { auth: { user: User } }) => state.auth.user
  );

  return (
    <nav className="sticky top-0 py-3 px-6 border-b-2 border-b-neutral-100 border-opacity-0 flex items-center justify-between">
      <Link to={'/'} className="font-exo text-lg">
        evoke-estate
      </Link>

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
        <NavigationCard user={user} />
      )}
    </nav>
  );
};
export default Navbar;

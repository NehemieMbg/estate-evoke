import { Link } from 'react-router-dom';
import { Logo, Menu, Message, NavigationCard, Notifications, Search } from '..';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import Navigation from './Navigation';
import useSession from '../../hooks/useSession';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { useState } from 'react';

const Navbar = () => {
  const { openLogin, openRegister, user, isLoggedIn } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky z-[99] top-0 py-2.5 px-6 bg-white flex items-center justify-between font-inter gap-6">
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="flex items-center gap-2">
        <button onClick={() => setIsMenuOpen(true)} className="lg:hidden">
          <Bars3Icon className="h-5 w-5 text-black" />
        </button>
        <Logo />
      </div>

      <Navigation />

      <div className="w-full max-lg:hidden">
        <Search />
      </div>

      {!isLoggedIn ? (
        <>
          <div className="flex gap-6 items-center text-sm whitespace-nowrap">
            <button className="max-lg:hidden" onClick={openLogin}>
              Log in
            </button>
            <button
              onClick={openRegister}
              className="max-lg:hidden text-white bg-black hover:opacity-90 transition-colors duration-200 py-2.5 px-5 rounded-full"
            >
              Sign up
            </button>

            <Link
              to={'/search'}
              className="lg:hidden bg-neutral-200 p-2 rounded-full border border-neutral-300"
            >
              <MagnifyingGlassIcon
                className="h-5 w-5 text-neutral-600"
                strokeWidth={2}
              />
            </Link>
          </div>
        </>
      ) : (
        <div className="flex gap-6 items-center">
          {/* TO NEW POST LG DEVICES */}
          <Link
            to={'/portfolio/new-design'}
            className="max-lg:hidden text-sm font-light bg-black border border-neutral-200 text-white py-3 px-5 rounded-md hover:opacity-90 transition-colors duration-200 hover:bg-opacity-95 flex items-center gap-2 w-max"
          >
            <PlusIcon className="h-4" strokeWidth={2.5} />
            <span>New Design</span>
          </Link>

          {/* TO NEW POST SM DEVICES */}
          <Link
            to={'/portfolio/new-design'}
            className="lg:hidden fixed bottom-5 right-8 text-blue-600 bg-white h-14 w-14 aspect-square rounded-full shadow-md flex items-center justify-center hover:bg-neutral-100 transition-colors duration-200 border border-neutral-100"
          >
            <PlusIcon className="h-7" strokeWidth={2} />
          </Link>

          <div className="flex items-center gap-4">
            <Message />
            <Notifications />

            <Link
              to={'/search'}
              className="lg:hidden bg-neutral-200 p-2 rounded-full border border-neutral-300"
            >
              <MagnifyingGlassIcon
                className="h-5 w-5 text-neutral-600"
                strokeWidth={2}
              />
            </Link>

            <NavigationCard user={user} />
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;

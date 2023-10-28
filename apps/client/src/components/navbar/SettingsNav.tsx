import { Link, useLocation } from 'react-router-dom';
import { settingsNav } from '../../constants';
import { DeleteAccountCard } from '..';
import { useState } from 'react';

const SettingsNav = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const path = pathname.split('/')[2];
  const [cardIsOpen, setCardIsOpen] = useState(false);

  return (
    <>
      <div className="min-[942px]:fixed flex flex-col gap-2 w-full max-w-[200px]">
        {settingsNav.map((nav) => (
          <Link
            key={nav.path}
            to={nav.path}
            className={`font-roboto text-[15px]  pl-4
	  ${
      path === nav.path.split('/')[2]
        ? 'font-semibold border-l-2 border-l-neutral-800'
        : 'font-normal'
    }
	  `}
          >
            {nav.label}
          </Link>
        ))}

        <div className="border-t border-t-neutral-200 mt-2">
          <button
            onClick={() => setCardIsOpen(true)}
            className="font-roboto text-[15px] pl-4 mt-4 text-red-400"
          >
            Delete my account
          </button>
        </div>
      </div>
      <DeleteAccountCard
        setCardIsOpen={setCardIsOpen}
        cardIsOpen={cardIsOpen}
      />
    </>
  );
};
export default SettingsNav;

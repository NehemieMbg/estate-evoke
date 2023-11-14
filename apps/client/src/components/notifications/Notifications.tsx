import { BellIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

const Notifications = () => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setMenu(false));

  return (
    <>
      <div
        className={`backdrop
 		   transition-all duration-200
			${menu ? 'opacity-100 visible' : 'opacity-0 invisible'}
 `}
      ></div>

      <div className="relative flex items-center font-inter">
        <button className="hover:text-neutral-500 transition-colors duration-200">
          <BellIcon onClick={() => setMenu(true)} className="h-5" />
        </button>

        <div
          ref={menuRef}
          className={`absolute z-[99] bg-white border-[1px] border-neutral-300 w-96 -right-8 top-9 rounded-md transition-all duration-200 overflow-hidden
		${menu ? 'opacity-100 visible' : 'opacity-0 invisible'}
	  `}
        >
          <div className="py-3 border-b">
            <h2 className="text-center font-medium text-[15px]">
              Your Notifications
            </h2>
          </div>

          <div className=" h-96">
            <div className="flex items-center justify-center h-full">
              <p className="text-sm">You don't have any notifications</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Notifications;

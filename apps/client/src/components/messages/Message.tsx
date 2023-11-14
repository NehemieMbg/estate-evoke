import { EnvelopeIcon } from '@heroicons/react/20/solid';
import { useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const Message = () => {
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
          <EnvelopeIcon onClick={() => setMenu(true)} className="h-5" />
        </button>

        <div
          ref={menuRef}
          className={`absolute z-[99] bg-white border-[1px] border-neutral-300 w-[460px] -right-8 top-9 rounded-md transition-all duration-200 overflow-hidden
		  ${menu ? 'opacity-100 visible' : 'opacity-0 invisible'}
		`}
        >
          <div className="py-3.5 border-b">
            <h2 className="text-center font-medium text-[15px]">
              Your Messages
            </h2>
          </div>

          <div className="flex items-center justify-between p-2	gap-2 text-sm font-normal text-blue-500 border-b">
            <button className="py-2.5 w-1/2 hover:underline hover:bg-blue-100 hover:bg-opacity-40 transition-colors duration-200 rounded-sm">
              Compose
            </button>

            <span className="text-neutral-600 font-light">|</span>

            <button className="py-2.5 w-1/2 hover:underline hover:bg-blue-100 hover:bg-opacity-40 transition-colors duration-200 rounded-sm">
              <span>View All</span>
              <ChevronRightIcon className="h-4 inline-block" />
            </button>
          </div>

          <div className=" h-64">
            <div className="flex items-center justify-center h-full">
              <p className="text-sm">You don't have any notifications</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Message;

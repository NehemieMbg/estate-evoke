import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

const Search = () => {
  const [search, setSearch] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useClickOutside(searchRef, () => setSearch(false));

  return (
    <>
      <div
        className={`backdrop
 		   transition-all duration-200
			${search ? 'opacity-100 visible' : 'opacity-0 invisible'}
 `}
      ></div>

      <div
        className={`relative z-[100] font-inter w-full

        `}
      >
        <div className="flex items-center gap-2.5 text-neutral-400">
          <MagnifyingGlassIcon className="h-5 " strokeWidth={2.2} />
          <p className="outline-none font-normal w-full bg-inherit cursor-text">
            Search...
          </p>
        </div>

        <div
          className={`px-4 py-2.5 z-[100] flex items-center gap-2.5 text-neutral-400 rounded-md w-full
        ${search ? '' : 'relative bg-neutral-200'}
        `}
        >
          <div className="flex items-center gap-2.5 text-black w-full">
            <MagnifyingGlassIcon
              className="h-4 text-neutral-400"
              strokeWidth={2.4}
            />
            <input
              type="text"
              onFocus={() => setSearch(true)}
              className="outline-none placeholder:font-light font-inter font-normal w-full bg-inherit"
              placeholder="Search..."
            />
          </div>
        </div>

        <div
          ref={searchRef}
          className={`absolute left-0 -top-0 z-[99] rounded-md w-full h-[470px] bg-white border border-neutral-200 shadow-md
          transition-all duration-200
          ${search ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}
        ></div>
      </div>
    </>
  );
};
export default Search;

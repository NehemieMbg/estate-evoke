import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

const Search = () => {
  const [search, setSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(searchRef, () => setSearch(false));

  useEffect(() => {
    if (search && inputRef.current) {
      setTimeout(() => {
        inputRef.current!.focus();
      }, 200);
    }
  }, [search]);

  return (
    <>
      <div
        className={`backdrop-search
 		   transition-all duration-200 z-[88] max-lg:hidden
			${search ? 'opacity-100 visible' : 'opacity-0 invisible'}
 `}
      ></div>

      <div
        className={`relative z-[90] font-inter w-full

        `}
      >
        <div
          onClick={() => setSearch(true)}
          className="px-4 py-2.5 flex items-center gap-2.5 text-neutral-500 bg-neutral-200 rounded-md"
        >
          <MagnifyingGlassIcon className="h-4" strokeWidth={2.4} />
          <p className="outline-none text-sm font-light py-[3px] w-full bg-inherit cursor-text">
            Search in evoke estate...
          </p>
        </div>

        <div
          ref={searchRef}
          className={`absolute left-0 -top-0 z-[99] rounded-md w-full h-[470px] bg-neutral-200 border border-neutral-200 shadow-md
          transition-all duration-200
          ${search ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}
        >
          <div
            className={`px-4 py-2.5 z-[100] flex items-center gap-2.5 text-neutral-400 rounded-sm w-full
        `}
          >
            <div className="flex items-center gap-2.5 text-black w-full">
              <MagnifyingGlassIcon
                className="h-4 text-neutral-500"
                strokeWidth={2.4}
              />
              <input
                ref={inputRef}
                type="text"
                className="outline-none placeholder:text-sm placeholder:font-light placeholder:text-neutral-500 font-inter font-normal w-full bg-inherit"
                placeholder="Search in evoke estate..."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Search;

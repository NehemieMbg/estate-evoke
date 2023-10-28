import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Search = () => {
  return (
    <div
      className={`relative max-w-[640px] w-full border-[1px] border-neutral-200 py-2 px-4 rounded-3xl bg-neutral-100`}
    >
      <div className="flex items-center gap-2.5 text-neutral-400">
        <MagnifyingGlassIcon className="h-4 " strokeWidth={2.4} />
        <p className="outline-none font-roboto font-light w-full bg-inherit cursor-text">
          Search...
        </p>
      </div>

      <div className="absolute top-0 left-0 bg-white w-full py-2 px-4 gap-2.5 rounded-2xl">
        <div className="flex items-center gap-2.5 text-neutral-400 w-full">
          <MagnifyingGlassIcon
            className="h-4 text-neutral-400"
            strokeWidth={2.4}
          />
          <input
            type="text"
            className="outline-none font-roboto placeholder:font-light w-full bg-inherit"
            placeholder="Search..."
          />
        </div>

        <div className="h-[540px]"></div>
      </div>
    </div>
  );
};
export default Search;

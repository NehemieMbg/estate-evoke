import { PlusIcon } from '@heroicons/react/24/outline';

const Stories = () => {
  return (
    <div className="mb-10 w-full">
      <button className="flex flex-col items-center gap-2 font-inter">
        <div className="flex items-center justify-center bg-neutral-800 hover:bg-neutral-950 transition-colors duration-200 h-16 w-16 aspect-square rounded-full">
          <PlusIcon className="w-8 h-8 text-white mx-auto" />
        </div>
        <p className="text-xs hover:underline font-medium">Add Yours</p>
      </button>
    </div>
  );
};
export default Stories;

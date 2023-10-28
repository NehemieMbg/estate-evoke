const BannerInput = () => {
  return (
    <div className="text-sm">
      <div className="bg-neutral-200 rounded-xl w-full h-36 max-md:h-24 aspect-auto mb-6"></div>

      <div className="w-full justify-end flex items-center gap-4">
        <button className="bg-black text-white font-light py-2 px-4 rounded-full hover:opacity-80 transition-colors duration-200">
          Upload new banner
        </button>
        <button className="">Delete</button>
      </div>
    </div>
  );
};
export default BannerInput;

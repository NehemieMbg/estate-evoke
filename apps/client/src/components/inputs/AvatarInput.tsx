const AvatarInput = () => {
  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="h-16 aspect-square rounded-full bg-neutral-200 mr-2"></div>
      <button className="bg-black text-white font-light py-2 px-4 rounded-full hover:opacity-80 transition-colors duration-200">
        Upload new picture
      </button>
      <button className="">Delete</button>
    </div>
  );
};
export default AvatarInput;

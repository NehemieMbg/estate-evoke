import { settingsPages } from '../../../constants';

const EditProfile = () => {
  const { editProfile } = settingsPages;
  return (
    <div className="font-roboto">
      <h1 className="setting-title">{editProfile.title}</h1>
      <p className="settings-description">{editProfile.description}</p>

      <div className="flex flex-col gap-10">
        {/* BANNER */}
        <div className="text-sm">
          <div className="bg-neutral-200 rounded-xl w-full h-36 aspect-auto mb-6"></div>

          <div className="w-full justify-end flex items-center gap-4">
            <button className="bg-black text-white font-light py-2 px-4 rounded-full hover:opacity-80 transition-colors duration-200">
              Upload new banner
            </button>
            <button className="">Delete</button>
          </div>
        </div>
        {/* IMAGE PROFILE */}
        <div className="flex items-center gap-4 text-sm">
          <div className="h-16 aspect-square rounded-full bg-neutral-200 mr-2"></div>
          <button className="bg-black text-white font-light py-2 px-4 rounded-full hover:opacity-80 transition-colors duration-200">
            Upload new picture
          </button>
          <button className="">Delete</button>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;

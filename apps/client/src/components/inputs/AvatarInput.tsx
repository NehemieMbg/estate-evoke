import customFetch from '../../utils/customFetch';
import { User } from '../../types/user-type';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CircularIndeterminate } from '..';

type AvatarInputProps = {
  user: User;
};

const AvatarInput: React.FC<AvatarInputProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append('avatar', file as Blob);

    try {
      const response = await customFetch.patch('/users/user/avatar', formData);
      toast.success(response.data.message);
      navigate('.');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Something went wrong');
    }
  };

  return (
    <form className="flex items-center gap-4 text-sm mb-6">
      <div className="relative h-16 aspect-square rounded-full bg-neutral-200 mr-2 overflow-hidden">
        <img src={user?.avatar} alt="avatar" className="object-center" />
        <div
          className={`absolute z-[10] left-[50%] translate-x-[-50%] translate-y-[-50%] top-[50%] text-white ${
            isLoading ? 'visible' : 'invisible'
          }`}
        >
          <CircularIndeterminate className="scale-[.5] h-7 -mt-1.5" />
        </div>
      </div>
      <label
        htmlFor="avatar"
        className="bg-black text-white font-light py-2 px-4 rounded-full hover:opacity-80 transition-colors duration-200 cursor-pointer"
      >
        Upload new picture
      </label>

      <input
        onChange={handleFileChange}
        type="file"
        name="avatar"
        id="avatar"
        accept="image/*"
        className="hidden"
      />

      <button className="">Delete</button>
    </form>
  );
};
export default AvatarInput;

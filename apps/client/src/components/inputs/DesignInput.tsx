import { PhotoIcon } from '@heroicons/react/20/solid';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

type DesignInputProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  setEnableContinue: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
};

const DesignInput: React.FC<DesignInputProps> = ({
  inputRef,
  setEnableContinue,
  setImageUrl,
  imageUrl,
}) => {
  const editMenuRef = useRef<HTMLDivElement>(null);

  const [editMenu, setEditMenu] = useState(false);

  useClickOutside(editMenuRef, () => setEditMenu(false));

  const handleRemoveInput = () => {
    setEditMenu(false);
    if (inputRef.current) inputRef.current.value = '';
    setImageUrl('');
    setEnableContinue(false);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setImageUrl(dataUrl);
        setEnableContinue(true);
      };
    } else {
      setImageUrl('');
    }
  };

  return (
    <div className="bg-white w-full rounded-sm min-h-full flex items-center justify-center py-6 min-[900px]:px-6 shadow-md">
      <div className="relative">
        <h2
          className={`mb-12 text-2xl font-exo font-light text-neutral-600
		${imageUrl && 'hidden'}
		`}
        >
          Start sharing your design.
        </h2>

        <div className="relative flex flex-col items-center gap-4">
          <label
            htmlFor="image"
            className={`bg-blue-50 text-blue-500 h-24 aspect-square rounded-full overflow-hidden flex justify-center items-center hover:bg-blue-500 hover:text-blue-50 cursor-pointer transition-colors duration-200
			${imageUrl && 'hidden'}
			`}
          >
            <PhotoIcon className="h-7 " />
          </label>

          <input
            ref={inputRef}
            onChange={handleFileChange}
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="hidden"
          />
          <p
            className={`text-[15px] font-exo font-medium
		 ${imageUrl && 'hidden'} 
		  `}
          >
            Image
          </p>
        </div>
      </div>
      {imageUrl && (
        <>
          <div className="relative p-1 border-2 outline-blue-300 hover:border-blue-500 rounded-sm">
            <img src={imageUrl} alt="image" className="" />

            <div className="absolute flex flex-col items-end top-6 right-6">
              <button
                onClick={() => setEditMenu(true)}
                className="bg-neutral-200 hover:bg-neutral-50 transition-colors duration-200 bg-opacity-80 w-max p-2.5 rounded-full"
              >
                <PencilIcon className="h-5 text-neutral-600" />
              </button>

              <div
                ref={editMenuRef}
                className={`mt-4 py-2 bg-neutral-50 shadow-md rounded-sm text-sm w-[186px] font-exo
			   		   transition-all duration-200
						  ${editMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}
			  `}
              >
                <label
                  htmlFor="image"
                  onClick={() => setEditMenu(false)}
                  className="inline-block cursor-pointer px-4 py-2.5 hover:bg-blue-100 transition-colors duration-200 w-full"
                >
                  Change image
                </label>

                <button
                  onClick={handleRemoveInput}
                  className="inline-block text-left cursor-pointer px-4 py-2.5 hover:bg-blue-100 transition-colors duration-200 w-full"
                >
                  Delete image
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DesignInput;

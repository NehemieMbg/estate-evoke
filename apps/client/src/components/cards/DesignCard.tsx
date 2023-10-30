import { useRef } from 'react';
import { DescriptionInput, FormInputs } from '..';
import useClickOutside from '../../hooks/useClickOutside';
import { useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { User } from '../../types/user-type';
import { EyeIcon, HeartIcon } from '@heroicons/react/20/solid';

type DesignCardProps = {
  setCardIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cardIsOpen: boolean;
  imageUrl: string;
};

const DesignCard: React.FC<DesignCardProps> = ({
  setCardIsOpen,
  cardIsOpen,
  imageUrl,
}) => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';

  const user = useSelector(
    (state: { auth: { user: User } }) => state.auth.user
  );

  const cardRef = useRef<HTMLDivElement>(null);

  useClickOutside(cardRef, () => setCardIsOpen(false));

  return (
    <div
      className={`fixed backdrop top-0 left-0 right-0 bottom-0 flex items-center justify-center
	transition-all duration-200
	${cardIsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
	`}
    >
      <div ref={cardRef} className="submit-card flex gap-12">
        <div className="">
          <h2 className='className="font-normal font-exo text-[15px] mb-2'>
            Project Cover
          </h2>
          <div className="w-[250px] h-[187px] rounded-sm overflow-hidden bg-neutral-200 mb-2">
            <img
              src={imageUrl}
              alt="image"
              width={250}
              height={187}
              className="min-h-full object-center"
            />
          </div>
          <div className=" text-xs text-neutral-500 flex justify-between items-center">
            <p>{user.name}</p>

            <div className="flex gap-2 items-center">
              <div className=" flex items-center gap-1">
                <HeartIcon className="h-3.5" />
                <span>0</span>
              </div>

              <div className=" flex items-center gap-1">
                <EyeIcon className="h-3.5" />
                <span>0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
          <FormInputs name="title" type="text" label="Title" />
          <DescriptionInput name="description" label="Description" />
          <FormInputs
            name="tag"
            type="text"
            label="Add Tags"
            placeholder="Max 5 tags, separated by commas."
            underText="Suggested Tags: interior, exterior, modern, rustic, contemporary, minimalist, vintage, landscaping, beachfront, sustainable."
          />

          <div className="mt-4 flex gap-4 justify-end items-center font-exo text-sm">
            <p onClick={() => setCardIsOpen(false)} className="cursor-pointer">
              Cancel
            </p>

            <button
              type="submit"
              className=" text-white font-medium bg-black py-1.5 px-4 rounded-full hover:bg-opacity-80 transition-colors duration-200"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DesignCard;

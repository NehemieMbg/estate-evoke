import { Link } from 'react-router-dom';
import { User } from '../../types/user-type';
import { PlusIcon } from '@heroicons/react/20/solid';

type UserCardProps = {
  user: User;
  cardIsOpen: boolean;
  setCardIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserCard: React.FC<UserCardProps> = ({
  user,
  cardIsOpen,
  setCardIsOpen,
}) => {
  return (
    <div
      onMouseLeave={() => setCardIsOpen(false)}
      className={`absolute z-[10] mt-2.5 font-roboto bg-white shadow-md shadow-neutral-200 border border-neutral-100 p-3.5 rounded-md max-w-[400px] w-full
	  ${cardIsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
	`}
    >
      <div className="flex justify-between mb-4">
        <div className="flex items-center  gap-2.5 w-full">
          <div className="h-10 w-10 aspect-square bg-neutral-200 overflow-hidden rounded-full">
            {user.avatar && (
              <img
                src={user.avatar}
                height={40}
                width={40}
                alt="avatar"
                className="object-cover w-full h-full"
              />
            )}
          </div>

          <div>
            <Link
              to={`/${user.username}`}
              className="font-medium leading-0 hover:underline"
            >
              {user.name}
            </Link>
            <p className="text-sm font-light">{user.location}</p>
          </div>
        </div>

        <button className="self-start bg-blue-600 hover:bg-opacity-90 transition-colors duration-200 rounded-full  px-3.5 py-1.5 text-xs text-white font-exo w-max flex items-center gap-1">
          <PlusIcon className="h-3 text-white" />
          <span>Follow</span>
        </button>
      </div>

      <div className={`grid grid-cols-3 gap-1.5`}>
        {user.posts.map((post, index) => (
          <div
            key={index}
            className="aspect-square bg-neutral-200 overflow-hidden rounded-md h-[100px] w-full"
          >
            {post.imageCoverUrl && (
              <img
                src={post.imageCoverUrl}
                alt=""
                className="object-cover object-center w-full h-full"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserCard;

import { Link } from 'react-router-dom';
import { Post } from '../../../types/post-type';
import { UserCard } from '../..';
import { useState } from 'react';

type PostHeaderProps = {
  post: Post;
};

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const [cardIsOpen, setCardIsOpen] = useState(false);
  const [canClose, setCanClose] = useState(false);

  let hoverTimer: NodeJS.Timeout;

  const handleMouseEnter = () => {
    hoverTimer = setTimeout(() => {
      setCardIsOpen(true);
      setCanClose(false);
      setTimeout(() => {
        setCanClose(true);
      }, 1000);
    }, 1000);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer);
    if (canClose) {
      setCardIsOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-2.5 py-6">
      <div className="h-10 w-10 aspect-auto bg-neutral-200 overflow-hidden rounded-full">
        {post.author.avatar && (
          <img
            src={post.author.avatar}
            height={40}
            width={40}
            alt="avatar"
            className="object-cover w-full"
          />
        )}
      </div>

      <div className="">
        <h3 className="font-medium leading-tight">{post.title}</h3>

        <div className="flex gap-2 font-light text-sm">
          <Link
            to={`/${post.author.username}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="hover:underline cursor-pointer"
          >
            {post.author.name}
          </Link>

          <div>&bull;</div>
          <button className="hover:underline">Follow</button>
        </div>

        <UserCard
          user={post.author}
          cardIsOpen={cardIsOpen}
          setCardIsOpen={setCardIsOpen}
        />
      </div>
    </div>
  );
};
export default PostHeader;

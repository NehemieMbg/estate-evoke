import { Link } from 'react-router-dom';
import { Post } from '../../../types/post-type';
import { UserCard } from '../..';
import useShowCard from '../../../hooks/useShowCard';
import useFollow from '../../../hooks/useFollow';
import { useSelector } from 'react-redux';
import { User } from '../../../types/user-type';

type PostHeaderProps = {
  post: Post;
};

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const user = useSelector(
    (state: { auth: { user: User } }) => state.auth.user
  );
  const { cardIsOpen, setCardIsOpen, handleMouseEnter, handleMouseLeave } =
    useShowCard();

  const [handleFollowing, handleUnfollowing] = useFollow();

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
            by {post.author.name}
          </Link>
          {user.username !== post.author.username && <div>&bull;</div>}

          {user.username !== post.author.username && (
            <>
              {post.author.isFollowing ? (
                <button
                  onClick={() => handleUnfollowing(post.author.id)}
                  className="hover:underline"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => handleFollowing(post.author.id)}
                  className="hover:underline"
                >
                  Follow
                </button>
              )}
            </>
          )}
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

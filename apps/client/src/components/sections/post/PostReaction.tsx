import { EnvelopeIcon, FolderIcon, HeartIcon } from '@heroicons/react/20/solid';
import { Post } from '../../../types/post-type';
import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { User } from '../../../types/user-type';
import useFollow from '../../../hooks/useFollow';
import useLike from '../../../hooks/useLike';

type PostReactionProps = {
  post: Post;
};

const PostReaction: React.FC<PostReactionProps> = ({ post }) => {
  const user = useSelector(
    (state: { auth: { user: User } }) => state.auth.user
  );

  const [handleFollowing, handleUnfollowing] = useFollow();
  const [handleLike, handleUnlike] = useLike();

  const handleFollow = () => {
    if (user.username === post.author.username) return;

    if (post.author.isFollowing) {
      handleUnfollowing(post.author.id);
    } else {
      handleFollowing(post.author.id);
    }
  };

  const handleLiking = () => {
    if (post.author.isLiking) {
      handleUnlike(post.id);
    } else {
      handleLike(post.id);
    }
  };

  return (
    <div className="fixed flex flex-col items-center gap-6 font-medium">
      <button onClick={handleFollow} className="relative">
        <div className="h-11 w-11 rounded-full bg-white border border-neutral-200 aspect-square overflow-hidden hover:brightness-75 transition-all duration-200 cursor-pointer">
          <img src={post.author.avatar} alt={post.author.username} />
        </div>

        {user.username !== post.author.username && (
          <>
            {post.author.isFollowing ? (
              <div className="absolute flex items-center justify-center bottom-0 right-0 bg-white border border-neutral-300 rounded-full h-4 aspect-square">
                <CheckIcon
                  className="w-2.5 h-2.5 text-blue-600"
                  strokeWidth={4.2}
                />
              </div>
            ) : (
              <div className="absolute flex items-center justify-center bottom-0 right-0 bg-blue-500 rounded-full h-4 aspect-square">
                <PlusIcon
                  className="w-2.5 h-2.5 text-white"
                  strokeWidth={4.2}
                />
              </div>
            )}
          </>
        )}
      </button>

      <div className="flex flex-col items-center gap-2">
        <button className="flex items-center justify-center h-11 w-11 rounded-full bg-white border border-neutral-200 aspect-square overflow-hidden hover:bg-neutral-200 transition-colors duration-200">
          <EnvelopeIcon className="w-5 h-5 text-black" />
        </button>
        <p className="text-neutral-800 text-xs">Message</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button className="flex items-center justify-center h-11 w-11 rounded-full bg-white border border-neutral-200 aspect-square overflow-hidden hover:bg-neutral-200 transition-colors duration-200">
          <FolderIcon className="w-5 h-5 text-black" />
        </button>
        <p className="text-neutral-800 text-xs">Save</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleLiking}
          className={`flex items-center justify-center h-11 w-11 rounded-full  border border-neutral-200 aspect-square overflow-hidden  transition-colors duration-200
          ${
            post.author.isLiking
              ? 'bg-blue-500 text-white hover:bg-red-600'
              : 'bg-white hover:bg-blue-500 hover:text-white'
          }
          `}
        >
          <HeartIcon className="w-5 h-5" />
        </button>
        <p className="text-neutral-800 text-xs">Like</p>
      </div>
    </div>
  );
};
export default PostReaction;

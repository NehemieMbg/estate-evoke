import { EnvelopeIcon, FolderIcon, HeartIcon } from '@heroicons/react/20/solid';
import { Post } from '../../../types/post-type';

type PostReactionProps = {
  post: Post;
};

const PostReaction: React.FC<PostReactionProps> = ({ post }) => {
  return (
    <div className="fixed flex flex-col items-center gap-6">
      <div>
        <div className="h-11 w-11 rounded-full bg-white border border-neutral-200 aspect-square overflow-hidden">
          <img src={post.author.avatar} alt={post.author.username} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button className="flex items-center justify-center h-11 w-11 rounded-full bg-white border border-neutral-200 aspect-square overflow-hidden hover:bg-neutral-50 transition-colors duration-200">
          <EnvelopeIcon className="w-5 h-5 text-black" />
        </button>
        <p className="text-neutral-800 text-xs">Message</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button className="flex items-center justify-center h-11 w-11 rounded-full bg-white border border-neutral-200 aspect-square overflow-hidden hover:bg-neutral-50 transition-colors duration-200">
          <FolderIcon className="w-5 h-5 text-black" />
        </button>
        <p className="text-neutral-800 text-xs">Save</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button className="flex items-center justify-center h-11 w-11 rounded-full bg-white border border-neutral-200 aspect-square overflow-hidden hover:bg-neutral-50 transition-colors duration-200">
          <HeartIcon className="w-5 h-5 text-black" />
        </button>
        <p className="text-neutral-800 text-xs">Like</p>
      </div>
    </div>
  );
};
export default PostReaction;

import { EnvelopeIcon, FolderIcon, HeartIcon } from '@heroicons/react/20/solid';
import { Post } from '../../../types/post-type';
import { PlusIcon } from '@heroicons/react/24/outline';

type PostReactionProps = {
  post: Post;
};

const PostReaction: React.FC<PostReactionProps> = ({ post }) => {
  return (
    <div className="fixed flex flex-col items-center gap-6 font-medium">
      <button className="relative">
        <div className="h-11 w-11 rounded-full bg-white border border-neutral-200 aspect-square overflow-hidden hover:brightness-75 transition-all duration-200 cursor-pointer">
          <img src={post.author.avatar} alt={post.author.username} />
        </div>

        <div className="absolute flex items-center justify-center bottom-0 right-0 bg-blue-500 rounded-full h-4 aspect-square">
          <PlusIcon className="w-2.5 h-2.5 text-white" strokeWidth={4.2} />
        </div>
      </button>

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
        <button className="flex items-center justify-center h-11 w-11 rounded-full bg-white border border-neutral-200 aspect-square overflow-hidden hover:bg-blue-500 hover:text-white transition-colors duration-200">
          <HeartIcon className="w-5 h-5" />
        </button>
        <p className="text-neutral-800 text-xs">Like</p>
      </div>
    </div>
  );
};
export default PostReaction;

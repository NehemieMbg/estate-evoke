import { EyeIcon, HeartIcon } from '@heroicons/react/20/solid';
import { Post } from '../../types/post-type';
import { Link } from 'react-router-dom';

type PostCardProps = {
  post: Post;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="post-card w-full">
      <div className="relative image-container bg-neutral-200 rounded-sm overflow-hidden mb-3 w-full">
        <img
          src={post.imageCoverUrl}
          alt={post.title}
          className="object-cover w-full"
        />

        {/*  On condition that post been posted for less than 5 days */}
        {(new Date().getTime() - new Date(post.createdAt).getTime()) /
          (1000 * 60 * 60 * 24) <=
          5 && (
          <div className="absolute z-[10] top-3 right-3">
            <p className="text-xs py-1 px-3 rounded-full uppercase bg-black bg-opacity-80 text-white font-exo font-light">
              New
            </p>
          </div>
        )}

        <div className="post-title w-full h-1/2 absolute z-[10] left-0 bottom-0">
          <h1 className="z-[10] absolute bottom-2.5 left-3 text-white hover:underline cursor-pointer">
            {post.title}
          </h1>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex gap-2 items-center">
            <div className="rounded-full bg-neutral-200 overflow-hidden h-5 aspect-square">
              <img src={post.author.avatar} alt={post.author.name} />
            </div>
            <Link to={`/${post.author.username}`} className=" font-bold">
              {post.author.name}
            </Link>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <HeartIcon className="h-3.5" />
              {/* <span>{post.likes || 0}</span> */}
              <span>{0}</span>
            </div>

            <div className="flex items-center gap-1">
              <EyeIcon className="h-3.5" />
              {/* <span>{post.likes || 0}</span> */}
              <span>{0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostCard;

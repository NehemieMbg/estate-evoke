import { EyeIcon, HeartIcon } from '@heroicons/react/20/solid';
import { Post } from '../../types/post-type';
import { useNavigate } from 'react-router-dom';

type ProfilePostCardProps = {
  post: Post;
};

const ProfilePostCard: React.FC<ProfilePostCardProps> = ({ post }) => {
  const navigate = useNavigate();
  const postName = post.title.split(' ').join('-');

  const handleTransitionToPost = () => {
    navigate(`/gallery/${post.id}/${postName}`);
  };

  return (
    <div className="post-card w-full">
      <div
        onClick={handleTransitionToPost}
        className="cursor-pointer relative image-container bg-neutral-200 rounded-md overflow-hidden w-full"
      >
        <img
          src={post.imageCoverUrl}
          alt={post.title}
          className="object-cover w-full"
        />

        <div className="post-title w-full h-1/2 absolute z-[10] left-0 bottom-0 font-roboto text-white">
          <div className="z-[10] absolute bottom-0 py-2.5 px-5 left-0 flex justify-between w-full items-end">
            <div>
              <h1 className="w-max hover:underline cursor-pointer font-medium">
                {post.title}
              </h1>
              <p className="text-sm font-light">@{post.author.username}</p>
            </div>

            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <HeartIcon className="h-3.5" />
                <span>{post.likes.length || 0}</span>
              </div>

              <div className="flex items-center gap-1">
                <EyeIcon className="h-3.5" />
                <span>{post.views || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePostCard;

import { EyeIcon, HeartIcon } from '@heroicons/react/20/solid';
import { Post } from '../../types/post-type';
import { Link, useNavigate } from 'react-router-dom';
import { UserCard } from '..';
import useShowCard from '../../hooks/useShowCard';

type PostCardProps = {
  post: Post;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();
  const postName = post.title.split(' ').join('-');

  const handleTransitionToPost = () => {
    navigate(`/gallery/${post.id}/${postName}`);
  };

  const { cardIsOpen, setCardIsOpen, handleMouseEnter, handleMouseLeave } =
    useShowCard();

  return (
    <div className="post-card w-full">
      <div
        onClick={handleTransitionToPost}
        className="relative image-container bg-neutral-200 rounded-md overflow-hidden mb-3 w-full cursor-pointer"
      >
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
          <h1 className="z-[10] absolute bottom-2.5 left-3 text-white hover:underline cursor-pointer font-roboto font-medium">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="flex items-center font-roboto justify-between text-xs">
        <div className="flex gap-2 items-center w-max">
          <div className="rounded-full bg-neutral-200 overflow-hidden h-5 aspect-square">
            <img src={post.author.avatar} alt={post.author.name} />
          </div>
          <Link
            to={`/${post.author.username}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="font-medium hover:underline"
          >
            {post.author.name}
          </Link>
        </div>

        <div className="flex gap-4 text-neutral-500">
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
      <UserCard
        user={post.author}
        cardIsOpen={cardIsOpen}
        setCardIsOpen={setCardIsOpen}
      />
    </div>
  );
};
export default PostCard;

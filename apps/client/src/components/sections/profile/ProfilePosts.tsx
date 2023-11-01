import { ProfilePostCard } from '../..';
import { Post } from '../../../types/post-type';

type ProfilePostsProps = {
  posts: Post[];
};

const ProfilePosts: React.FC<ProfilePostsProps> = ({ posts }) => {
  return (
    <div className="posts w-full grid max grid-cols-7 max-[2730px]:grid-cols-6 max-[2326px]:grid-cols-5 max-[1825px]:grid-cols-4 max-[1506px]:grid-cols-3 max-[1197px]:grid-cols-2 max-[729px]:grid-cols-1 gap-5">
      {posts.map((post) => (
        <ProfilePostCard post={post} key={post.id} />
      ))}
    </div>
  );
};
export default ProfilePosts;

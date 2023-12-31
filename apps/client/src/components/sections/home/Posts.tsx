import { useLoaderData } from 'react-router-dom';
import { PostCard } from '../..';
import { Post } from '../../../types/post-type';

const Posts = () => {
  const posts = useLoaderData() as Post[];

  return (
    <div className="posts w-full grid max grid-cols-8 max-[3030px]:grid-cols-7 max-[2626px]:grid-cols-6 max-[2125px]:grid-cols-5 max-[1806px]:grid-cols-4 max-[1497px]:grid-cols-3 max-[991px]:grid-cols-2 max-[663px]:grid-cols-1 gap-5">
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};
export default Posts;

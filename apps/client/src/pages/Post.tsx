import { useLoaderData } from 'react-router-dom';
import { Post as PostType } from '../types/post-type';
import { PostHeader, PostReaction } from '../components';

const Post = () => {
  const post = useLoaderData() as PostType;

  return (
    <section className="relative px-[74px] pb-10 bg-neutral-50">
      <div className="relative flex max-w-[1400px] mx-auto ">
        <div className="max-w-screen-post mx-auto w-full font-roboto ">
          <PostHeader post={post} />

          <div className="relative">
            <div className="overflow-hidden rounded-md">
              <img src={post.imageUrl} alt={post.title} className="w-full" />
            </div>

            <div className="absolute top-0 -right-3">
              <PostReaction post={post} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Post;

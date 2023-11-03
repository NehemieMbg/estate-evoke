import { useLoaderData } from 'react-router-dom';
import { Post as PostType } from '../types/post-type';
import { PostHeader } from '../components';

const Post = () => {
  const post = useLoaderData() as PostType;

  return (
    <section className=" px-6 ">
      <div className="max-w-screen-normal mx-auto w-full font-roboto">
        <PostHeader post={post} />
      </div>
    </section>
  );
};
export default Post;

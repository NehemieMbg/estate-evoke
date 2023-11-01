import { useLoaderData } from 'react-router-dom';
import ProfilePosts from './ProfilePosts';
import { Post } from '../../../types/post-type';

const Work = () => {
  const posts = useLoaderData() as Post[];
  console.log(posts);

  return <ProfilePosts posts={posts} />;
};
export default Work;

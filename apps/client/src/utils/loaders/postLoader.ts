import { ActionFunctionArgs } from 'react-router-dom';
import customFetch from '../customFetch';
import { AxiosError } from 'axios';

export const postLoader = async ({ params }: ActionFunctionArgs) => {
  const { postId } = params;
  try {
    const {
      data: { post: post },
    } = await customFetch.get(`/posts/${postId}`);

    // Check if user is following the author of the post
    try {
      const {
        data: { isFollowing },
      } = await customFetch.get(`/follows/${post.author.id}`);
      post.author.isFollowing = isFollowing;

      const {
        data: { isLiking },
      } = await customFetch.get(`/likes/${postId}`);
      post.author.isLiking = isLiking;
    } catch (error) {
      post.author.isFollowing = false;
      post.author.isLiking = false;
    }

    return post;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data.message;
    return 'Something went wrong';
  }
};

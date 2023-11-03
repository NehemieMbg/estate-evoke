import { useLoaderData } from 'react-router-dom';
import { Post as PostType } from '../types/post-type';
import { PostHeader, PostReaction } from '../components';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Post = () => {
  const post = useLoaderData() as PostType;
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [isImageZoomedIn, setIsImageZoomedIn] = useState(false);

  return (
    <section className="relative px-[94px] pb-10 bg-neutral-50">
      <div className="relative flex max-w-[1400px] mx-auto ">
        <div className="max-w-screen-post mx-auto w-full font-roboto ">
          <PostHeader post={post} />

          <div className="relative">
            <div
              onClick={() => setIsImageFullScreen(true)}
              className="overflow-hidden rounded-sm cursor-zoom-in"
            >
              <img src={post.imageUrl} alt={post.title} className="w-full" />
            </div>

            <div className="absolute top-0 -right-6">
              <PostReaction post={post} />
            </div>
          </div>
        </div>
      </div>

      {isImageFullScreen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] bg-black w-full overflow-y-scroll">
          <img
            src={post.imageUrl}
            alt={post.title}
            onClick={() => setIsImageZoomedIn(!isImageZoomedIn)}
            className={` mx-auto aspect-auto
            ${
              isImageZoomedIn
                ? 'w-full z-[20] cursor-zoom-out'
                : 'h-full cursor-zoom-in'
            }
            `}
          />

          <div>
            <div></div>
            <div></div>
          </div>

          {!isImageZoomedIn && (
            <button
              onClick={() => setIsImageFullScreen(false)}
              className="fixed top-5 right-5 bg-neutral-700 p-2 rounded-full z-[10]"
            >
              <XMarkIcon className="w-4 h-4 text-white" strokeWidth={2.8} />
            </button>
          )}
        </div>
      )}
    </section>
  );
};
export default Post;

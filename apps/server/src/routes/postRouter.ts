import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  createPost,
  getPosts,
  getFollowingPosts,
  getSinglePost,
  updatePost,
} from '../controllers/postController';
import {
  validatePost,
  validateUpdatePost,
} from '../middlewares/validationMiddleware';
import upload from '../middlewares/multerMiddleware';

const router = Router();

router
  .route('/')
  .get(getPosts)
  .post(authMiddleware, upload.single('image'), validatePost, createPost);

router.route('/following').get(authMiddleware, getFollowingPosts);

router
  .route('/:postId')
  .get(getSinglePost)
  .patch(authMiddleware, validateUpdatePost, updatePost);

export default router;

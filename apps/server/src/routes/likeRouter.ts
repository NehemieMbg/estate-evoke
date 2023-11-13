import { Router } from 'express';
import { isLiking, likePost, unlikePost } from '../controllers/likeController';

const router = Router();

router.route('/:postId').post(likePost).delete(unlikePost).get(isLiking);

export default router;

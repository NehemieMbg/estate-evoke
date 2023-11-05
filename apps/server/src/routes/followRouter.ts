import { Router } from 'express';
import {
  followUser,
  getFollows,
  isFollowing,
  unfollowUser,
} from '../controllers/followController';

const router = Router();

router.route('/').get(getFollows);
router.route('/:id').get(isFollowing).post(followUser).delete(unfollowUser);

export default router;

import { Router } from 'express';
import {
  followUser,
  getFollows,
  unfollowUser,
} from '../controllers/followController';

const router = Router();

router.route('/').get(getFollows);
router.route('/:id').post(followUser).delete(unfollowUser);

export default router;

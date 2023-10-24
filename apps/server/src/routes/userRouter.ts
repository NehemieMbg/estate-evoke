import { Router } from 'express';
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/userController';
import { validateUpdateUser } from '../middlewares/validationMiddleware';

const router = Router();

// Get all users & create a user
router.route('/').get(getAllUsers);

// Get a user, update a user, delete a user
router
  .route('/:id')
  .get(getUser)
  .put(validateUpdateUser, updateUser)
  .delete(deleteUser);

router.route('user/credentials').patch();

export default router;

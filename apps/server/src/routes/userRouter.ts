import { Router } from 'express';
import {
  deleteUser,
  getAllUsers,
  getCurrentUser,
  updateUser,
  updateUserCredentials,
  updateUserPassword,
} from '../controllers/userController';
import {
  validateCredentials,
  validateUpdatePassword,
  validateUpdateUser,
} from '../middlewares/validationMiddleware';

const router = Router();

// Get all users & create a user
router.route('/').get(getAllUsers);

// Get a user, update a user, delete a user
router
  .route('/user')
  .get(getCurrentUser)
  .put(validateUpdateUser, updateUser)
  .delete(deleteUser);

router
  .route('/user/credentials')
  .patch(validateCredentials, updateUserCredentials);
router
  .route('/user/credentials/password')
  .patch(validateUpdatePassword, updateUserPassword);

export default router;

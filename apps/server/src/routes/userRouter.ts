import { Router } from 'express';
import {
  deleteProfilePicture,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  updateProfilePicture,
  updateUser,
  updateUserCredentials,
  updateUserPassword,
} from '../controllers/userController';
import {
  validateCredentials,
  validateUpdatePassword,
  validateUpdateUser,
} from '../middlewares/validationMiddleware';
import upload from '../middlewares/multerMiddleware';

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
  .route('/user/avatar')
  .patch(upload.single('avatar'), updateProfilePicture)
  .delete(deleteProfilePicture);

router
  .route('/user/credentials')
  .patch(validateCredentials, updateUserCredentials);
router
  .route('/user/credentials/password')
  .patch(validateUpdatePassword, updateUserPassword);

export default router;

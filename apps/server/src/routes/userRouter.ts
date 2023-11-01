import { Router } from 'express';
import {
  deleteProfilePicture,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getUser,
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
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Get all users & create a user
router.route('/').get(getAllUsers);

router
  .route('/user')
  .get(authMiddleware, getCurrentUser)
  .put(authMiddleware, validateUpdateUser, updateUser)
  .delete(authMiddleware, deleteUser);

router.route('/user/:username').get(getUser);

router
  .route('/user/avatar')
  .patch(authMiddleware, upload.single('avatar'), updateProfilePicture)
  .delete(authMiddleware, deleteProfilePicture);

router
  .route('/user/credentials')
  .patch(authMiddleware, validateCredentials, updateUserCredentials);
router
  .route('/user/credentials/password')
  .patch(authMiddleware, validateUpdatePassword, updateUserPassword);

export default router;

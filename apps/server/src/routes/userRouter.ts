import { Router } from 'express';
import { createUser } from '../controllers/userController';
import { validateCreateUser } from '../middlewares/validationMiddleware';

const router = Router();

// Get all users & create a user
router.route('/').get().post(createUser);

// Get a user, update a user, delete a user
router.route('/:id').get().put().delete();

export default router;

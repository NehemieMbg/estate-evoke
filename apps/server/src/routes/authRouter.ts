import { Router } from 'express';
import {
  validateCreateUser,
  validateSignIn,
} from '../middlewares/validationMiddleware';
import {
  createUser,
  logUserIn,
  logUserOut,
} from '../controllers/authController';

const router = Router();

router.post('/sign-up', validateCreateUser, createUser);
// router.post('/sign-up', validateCreateUser, (req, res) => {
//   res.send('Hello');
// });
router.post('/sign-in', validateSignIn, logUserIn);
router.get('/sign-out', logUserOut);

export default router;

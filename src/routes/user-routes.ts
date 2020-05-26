import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { auth} from '../middleware/auth';

const userRouter = Router();
const userController = new UserController();

userRouter.put('/update', auth, userController.changePassword);

export default userRouter;

import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { auth} from '../middleware/auth';

const publicRouter = Router();
const userController = new UserController();

publicRouter.post('/register',userController.register);
publicRouter.post('/login', userController.login);

export default publicRouter;

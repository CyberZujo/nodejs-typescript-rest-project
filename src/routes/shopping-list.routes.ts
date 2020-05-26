import { Router } from 'express';
import { ShoppingListController } from '../controllers/ShoppingListController';
import { auth } from '../middleware/auth';

const shoppingListRouter = Router();
const shoppingListController = new ShoppingListController();

shoppingListRouter.get('/', auth,shoppingListController.get);
shoppingListRouter.get('/report', auth, shoppingListController.report);
shoppingListRouter.post('/', auth, shoppingListController.post);
shoppingListRouter.put('/:id', auth, shoppingListController.put);
shoppingListRouter.delete('/:id', auth, shoppingListController.delete);
export default shoppingListRouter;

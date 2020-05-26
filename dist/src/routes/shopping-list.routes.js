"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ShoppingListController_1 = require("../controllers/ShoppingListController");
const auth_1 = require("../middleware/auth");
const shoppingListRouter = express_1.Router();
const shoppingListController = new ShoppingListController_1.ShoppingListController();
shoppingListRouter.get('/', auth_1.auth, shoppingListController.get);
shoppingListRouter.get('/report', auth_1.auth, shoppingListController.report);
shoppingListRouter.post('/', auth_1.auth, shoppingListController.post);
shoppingListRouter.put('/:id', auth_1.auth, shoppingListController.put);
shoppingListRouter.delete('/:id', auth_1.auth, shoppingListController.delete);
exports.default = shoppingListRouter;
//# sourceMappingURL=shopping-list.routes.js.map
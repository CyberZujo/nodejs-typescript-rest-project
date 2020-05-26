"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const publicRouter = express_1.Router();
const userController = new UserController_1.UserController();
publicRouter.post('/register', userController.register);
publicRouter.post('/login', userController.login);
exports.default = publicRouter;
//# sourceMappingURL=public.routes.js.map
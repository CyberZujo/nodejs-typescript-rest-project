"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../middleware/auth");
const userRouter = express_1.Router();
const userController = new UserController_1.UserController();
userRouter.put('/update', auth_1.auth, userController.changePassword);
exports.default = userRouter;
//# sourceMappingURL=user-routes.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = __importDefault(require("../services/user-service"));
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = req.body;
                const user = yield user_service_1.default.create(model);
                res.status(200).json({ message: 'Successfully registered, sign in to continue' });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = req.body;
                const token = yield user_service_1.default.authenticate(model);
                res.body = token;
                res.send(token);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = {
                    id: req.decoded.id,
                    currentPassword: req.body.currentPassword,
                    newPassword: req.body.newPassword
                };
                const result = yield user_service_1.default.changePassword(user.currentPassword, user.newPassword, user.id);
                res.json({ message: 'Successfully changed password', user: result });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map
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
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const auth_1 = require("../middleware/auth");
class UserService {
    constructor() {
        this.secret = 'superStrongSecret';
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = new user_1.default(data);
                const user = yield user_1.default.create(model);
                return user;
            }
            catch (error) {
                throw new mongoose_1.Error(user_1.default.schema.statics.parseError(error));
            }
        });
    }
    authenticate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findOne({ email: data.email });
                if (!user) {
                    throw new mongoose_1.Error('User not found!');
                }
                const isMatch = yield user_1.default.schema.methods.comparePassword(data.password, user.password);
                if (isMatch) {
                    const tokenData = {
                        id: user.id,
                        email: user.email
                    };
                    const token = auth_1.generateToken(tokenData);
                    return token;
                }
                else {
                    throw new mongoose_1.Error('Password does not match');
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    changePassword(currentPassword, newPassword, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(id);
                if (!user) {
                    throw new mongoose_1.Error('User does not exist!');
                }
                const isMatch = yield user_1.default.schema.methods.comparePassword(currentPassword, user.password);
                console.log(isMatch);
                if (!isMatch) {
                    throw new mongoose_1.Error('Your current password is not correct!');
                }
                if (!bcrypt_1.default.compare(user.password, currentPassword)) {
                    throw new mongoose_1.Error('Your current password is not correct!');
                }
                if (currentPassword === newPassword) {
                    throw new mongoose_1.Error('Your new password must be different from your current one');
                }
                user.password = newPassword;
                return user.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=user-service.js.map
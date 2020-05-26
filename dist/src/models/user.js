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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const email_validator_1 = __importDefault(require("email-validator"));
const saltRounds = 12;
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: email_validator_1.default.validate,
            message: 'Email is not in valid format'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, { versionKey: false });
UserSchema.pre('save', function (next) {
    this.password = bcrypt_1.default.hashSync(this.password, saltRounds);
    next();
});
UserSchema.statics.parseError = function (error) {
    let errors = [];
    for (let key in error.errors) {
        let errorItem = {};
        errorItem['message'] = error.errors[key].message;
        errors.push(errorItem);
    }
    return errors;
};
UserSchema.statics.findByCredentials = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ email });
    if (!user) {
        throw new Error('User does not exist');
    }
});
UserSchema.methods.comparePassword = (candidatePassword, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(candidatePassword, userPassword);
});
const User = mongoose_1.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=user.js.map
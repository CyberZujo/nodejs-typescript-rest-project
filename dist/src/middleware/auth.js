"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
exports.auth = function (req, res, next) {
    const authHeader = req.headers.authorization ? req.headers.authorization : req.headers['token'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, config_1.default.token.SECRET, (err, data) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.decoded = data;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.generateToken = function (data) {
    return jsonwebtoken_1.default.sign(data, config_1.default.token.SECRET);
};
//# sourceMappingURL=auth.js.map
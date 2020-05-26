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
exports.ShoppingListController = void 0;
const shopping_list_service_1 = __importDefault(require("../services/shopping-list-service"));
class ShoppingListController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.decoded.id;
                const list = yield shopping_list_service_1.default.getShoppingList(userId);
                res.send(list);
            }
            catch (error) {
                res.status(500).send();
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.decoded.id;
                const data = req.body;
                data.userId = userId;
                const result = yield shopping_list_service_1.default.create(data);
                res.status(200).json({ message: 'Success', list: result.title });
            }
            catch (error) {
                res.status(400).json({ error });
            }
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const userId = req.decoded.id;
                if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                    return res.status(400).json({ message: 'You must provide some data to the body' });
                }
                const list = req.body;
                const updatedList = yield shopping_list_service_1.default.update(list, id);
                res.send(updatedList);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                shopping_list_service_1.default.delete(id);
                res.status(204).send();
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    report(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.decoded.id;
                const from = req.query.from;
                const to = req.query.to;
                const result = yield shopping_list_service_1.default.report(from, to, id);
                res.send(result);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
}
exports.ShoppingListController = ShoppingListController;
//# sourceMappingURL=ShoppingListController.js.map
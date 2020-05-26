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
const shoppingList_1 = __importDefault(require("../models/shoppingList"));
const mongoose_1 = require("mongoose");
const util_1 = require("util");
class ShoppingListService {
    getShoppingList(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = shoppingList_1.default.find({ userId: userId });
                return list;
            }
            catch (error) {
                throw error;
            }
        });
    }
    create(shoppingList) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (util_1.isNullOrUndefined(shoppingList.title)) {
                    throw new mongoose_1.Error('You must provide list title');
                }
                const existingList = shoppingList_1.default.find({ title: shoppingList.title });
                if (!util_1.isNullOrUndefined(existingList)) {
                    throw new mongoose_1.Error('List aready exists');
                }
                const model = shoppingList;
                const result = yield shoppingList_1.default.create(shoppingList);
                return result;
            }
            catch (error) {
                throw new mongoose_1.Error(error.message);
            }
        });
    }
    update(shoppingList, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield shoppingList_1.default.findById(id);
                const productList = shoppingList.products;
                if (!list) {
                    throw new mongoose_1.Error('List could not be found!');
                }
                if (shoppingList.title) {
                    list.title = shoppingList.title;
                }
                if (productList) {
                    list.products = productList;
                }
                return list.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield shoppingList_1.default.findByIdAndDelete({ _id: id });
            }
            catch (error) {
                throw new mongoose_1.Error(error.message);
            }
        });
    }
    report(from, to, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (util_1.isNullOrUndefined(from) || util_1.isNullOrUndefined(to)) {
                    throw new mongoose_1.Error('You must provide valid range of dates');
                }
                let pipeline = {
                    'userId': new mongoose_1.mongo.ObjectId(userId),
                    'createdAt': {
                        '$gte': new Date(from),
                        '$lte': new Date(to)
                    }
                };
                return yield shoppingList_1.default.aggregate([
                    { '$match': pipeline },
                    { '$unwind': '$products' },
                    {
                        '$group': {
                            '_id': '$products.name',
                            'total': { '$sum': '$products.quantity' }
                        }
                    },
                    {
                        '$project': {
                            '_id': 0,
                            'total': 1,
                            'product': '$_id'
                        }
                    }
                ]);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new ShoppingListService();
//# sourceMappingURL=shopping-list-service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ShoppingListSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    products: [{
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
}, { versionKey: false });
ShoppingListSchema.statics.parseError = function (error) {
    let errors = [];
    for (let key in error.errors) {
        let errorItem = {};
        errorItem['message'] = error.errors[key].message;
        errors.push(errorItem);
    }
    return errors;
};
exports.default = mongoose_1.model('ShoppingList', ShoppingListSchema);
//# sourceMappingURL=shoppingList.js.map
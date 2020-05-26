import { model, Schema, Error } from 'mongoose';
import IShoppingList from './interfaces/IShoppingList';


const ShoppingListSchema:Schema<IShoppingList> = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    }, 
    userId: {
        type: Schema.Types.ObjectId,
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
}, {versionKey: false});

ShoppingListSchema.statics.parseError = function(error) {
    let errors = [];
    for(let key in error.errors) {
        let errorItem = {};
        errorItem['message'] = error.errors[key].message;
        errors.push(errorItem);
    }
    return errors;
}

export default model<IShoppingList>('ShoppingList', ShoppingListSchema);


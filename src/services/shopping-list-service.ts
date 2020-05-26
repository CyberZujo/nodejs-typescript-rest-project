import shoppingListSchema from '../models/shoppingList';
import IShoppingList from '../models/interfaces/IShoppingList';
import { Error, mongo } from 'mongoose';
import { isNullOrUndefined } from 'util';

class ShoppingListService {

    public async getShoppingList(userId) {
        try {
            const list = shoppingListSchema.find({userId: userId});
            return list;
        } catch (error) {
            throw error;
        }
    }

    public async create(shoppingList: IShoppingList) {
        try {
            if(isNullOrUndefined(shoppingList.title)) {
                throw new Error('You must provide list title');
            }

            const result = await shoppingListSchema.create(shoppingList);
            return result;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async update(shoppingList: IShoppingList, id) {
        try {
            const list = await shoppingListSchema.findById(id);
            const productList = shoppingList.products;

            if (!list) {
                throw new Error('List could not be found!');
            }

            if (shoppingList.title) {
                list.title = shoppingList.title;
            }

            if (productList) {
                list.products = productList;
            }
            
            return list.save();
        } catch (error) {
            throw error;
        }
    }

    public async delete(id) {
        try {
            await shoppingListSchema.findByIdAndDelete({_id: id});
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async report(from, to, userId) {
        try {

            if (isNullOrUndefined(from) || isNullOrUndefined(to)) {
                throw new Error('You must provide valid range of dates');
            }
         
            let pipeline = {
                'userId': new mongo.ObjectId(userId),
                'createdAt': {
                    '$gte': new Date(from),
                    '$lte': new Date(to)
                }
            }

            return await shoppingListSchema.aggregate([
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

        } catch (error) {
            throw error;
        }
    }
}


export default new ShoppingListService();

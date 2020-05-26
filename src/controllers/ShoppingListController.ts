import IShoppingList from '../models/interfaces/IShoppingList';
import shoppingListService from '../services/shopping-list-service';

export class ShoppingListController {

    public async get(req, res) {
        try {
            const userId = req.decoded.id;
            const list = await shoppingListService.getShoppingList(userId);

            res.send(list);
        } catch (error) {
            res.status(500).send();
        }
    }

    public async post(req, res) {
        try {
            const userId = req.decoded.id;
            const data: IShoppingList = req.body;
            data.userId = userId;

            const result = await shoppingListService.create(data);

            res.status(200).json({message: 'Success', list: result.title});
            
        } catch (error) {
            res.status(400).json({error});
        }
    }

    public async put(req, res) {
        try {
            const id = req.params.id;
            const userId = req.decoded.id;
            
            if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: 'You must provide some data to the body' });
            }

            const list: IShoppingList = req.body;
            const updatedList = await shoppingListService.update(list, id);

            res.send(updatedList);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    public async delete(req, res) {
        try {
            const id = req.params.id;
            shoppingListService.delete(id);

            res.status(204).send();
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    public async report(req, res) {
        try {
            const id = req.decoded.id;
            const from = req.query.from;
            const to = req.query.to;
            const result = await shoppingListService.report(from, to, id);

            res.send(result)
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
}
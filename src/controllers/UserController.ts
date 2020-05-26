import userService from '../services/user-service';
import IUser from '../models/interfaces/IUser';


export class UserController {
    
    public async register(req, res) {
        try {
            const model: IUser = req.body;
            const user = await userService.create(model);

            res.status(200).json({message: 'Successfully registered, sign in to continue'});
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    public async login(req, res) {
        try {
            const model: IUser = req.body;
            const token = await userService.authenticate(model);
            res.body=token;
            
            res.send(token);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    public async changePassword(req, res) {
        try {
            let user = {
                id: req.decoded.id,
                currentPassword: req.body.currentPassword,
                newPassword: req.body.newPassword
            };

            const result = await userService.changePassword(user.currentPassword, user.newPassword, user.id);

            res.json({message: 'Successfully changed password', user: result});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}
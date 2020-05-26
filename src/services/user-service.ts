import userSchema from '../models/user';
import IUser from '../models/interfaces/IUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Error } from 'mongoose';
import {generateToken} from '../middleware/auth';
class UserService {
    private secret: string = 'superStrongSecret';

    async create(data: IUser) {
        try {
            const model = new userSchema(data);
            const user = await userSchema.create(model);
            
            return user;
        } catch (error) {
           throw new Error(userSchema.schema.statics.parseError(error));
        }
    }

    async authenticate(data: IUser) {
        try {
            const user = await userSchema.findOne({ email: data.email });

            if (!user) {
                throw new Error('User not found!');
            }

            const isMatch = await userSchema.schema.methods.comparePassword(data.password, user.password);
           
            if (isMatch) {

                const tokenData = {
                    id: user.id,
                    email: user.email
                };

                const token = generateToken(tokenData);
                return token;
            } else {
                throw new Error('Password does not match');
            }
         
        } catch (error) {
            throw error;
        }
    }

    async changePassword(currentPassword: string, newPassword: string, id: string) {
        try {
            const user = await userSchema.findById(id);
                
            if(!user) {
                throw new Error('User does not exist!');
            }

            const isMatch = await userSchema.schema.methods.comparePassword(currentPassword, user.password);
            console.log(isMatch);
            if (!isMatch) {
                throw new Error('Your current password is not correct!');
            }

            if(!bcrypt.compare(user.password, currentPassword)) {
                throw new Error('Your current password is not correct!');
            }

            if (currentPassword === newPassword) {
                throw new Error('Your new password must be different from your current one');
            }

            user.password = newPassword;
            return user.save();

        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();
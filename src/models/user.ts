import { model, Schema } from 'mongoose';
import  IUser from './interfaces/IUser';
import bcrypt from 'bcrypt';
import emailValidator from 'email-validator';

const saltRounds = 12;

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        trim: true,
        required:true,
        unique: true,
        validate: {
            validator: emailValidator.validate,
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

UserSchema.pre('save', function<IUser>(next: () => void){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});


UserSchema.statics.parseError = function(error) {
    let errors = [];
    for(let key in error.errors) {
        let errorItem = {};
        errorItem['message'] = error.errors[key].message;
        errors.push(errorItem);
    }
    return errors;
}

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('User does not exist');
    }
}

UserSchema.methods.comparePassword = async (candidatePassword: string, userPassword) => {
   return await bcrypt.compare(candidatePassword, userPassword);
};

const User = model<IUser>('User', UserSchema);

export default User;

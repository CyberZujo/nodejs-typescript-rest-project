import { Schema, Document } from 'mongoose';

export default interface IProduct extends Document {
    name: string,
    quantity: number
}
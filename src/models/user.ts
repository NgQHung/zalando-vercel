import mongoose from 'mongoose';
import IUser from '../interfaces/user';

export interface IUserModel extends IUser, mongoose.Document {
  _id: any;
  _doc?: any;
}

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true, minlength: 10, maxlength: 50 },
    password: { type: String, require: true, unique: true, minlength: 6 },
    admin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUserModel>('users', userSchema);

import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  firstNama: string,
  lastName: string,
  age: number,
  document: string,
  email: string,
};

const userSchema = Schema({
  firstName: String,
  lasstName: String,
  age: Number,
  document: String,
  email: String,
});

export default model<IUser>('User', userSchema);

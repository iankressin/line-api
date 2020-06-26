import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

interface IUser extends Document {
  firstNama: string,
  lastName: string,
  age: number,
  document: string,
  email: string,
  password: string,
};

const userSchema = Schema({
  firstName: String,
  lasstName: String,
  age: Number,
  document: String,
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

userSchema.pre('save', function (next) {
  const user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (error, salt) => {
    if(error) return next(error);

    bcrypt.hash(user.password, salt, (error, hash) => {
      if(error) return next(error);

      user.password = hash;
      next();
    })
  })
})

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  const user = this;

  bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
    if(error) callback(error);

    callback(null, isMatch);
  })
}

export default model<IUser>('User', userSchema);

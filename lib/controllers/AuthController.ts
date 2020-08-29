import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../schemas/User';

class AuthController {
  public signIn = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { email, password } = request.body;

    try {
      const user = await this.checkUser(email, password);

      delete user.password;

      console.log('Doc >>> ', user);
      const token = jwt.sign({ ...user }, 'secret');

      return response.json({ ...user, token });
    } catch (error) {
      response.status(401);
      return response.send(error.message);
    }
  };

  private checkUser = async (
    email: string,
    password: string
  ): Promise<IUser> => {
    const user = await User.findOne({ email }).select('+password');

    if (!user) throw new Error('No user was found with the given email');

    const passwordsMatch = user.comparePassword(password, (error, isMatch) =>
      console.log(error, isMatch)
    );

    return user._doc;
  };
}

export default new AuthController();

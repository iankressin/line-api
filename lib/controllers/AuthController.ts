import { Request, Response } from 'express';
import User, { IUser } from "../schemas/User";

class AuthController {
  public signIn = async (request: Request, response: Response): Promise<Response> => {
    const { email, password } = request.body;
    
    const user = await this.checkUser(email, password);
    
    delete user.password;
    
    return response.json(user);
  }

  private checkUser = async (email: string, password: string): Promise<IUser> =>  {
    const user = await User.findOne({ email }).select('+password');
    console.log(user);

    if(!user)
      throw new Error('No user was found with the given email');


    const passwordsMatch = user.comparePassword(password, (error, isMatch) => console.log(error, isMatch))

    return user;
  }
}

export default new AuthController();


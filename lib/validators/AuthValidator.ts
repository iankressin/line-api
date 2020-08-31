import { Request, Response } from 'express';
import { IUser } from '../schemas/User';
import jwt from 'jsonwebtoken';

class AuthValidator {
  public isUserSignedIn = (request: Request, response: Response, next): void => {
    try {
      const token = this.getToken(request);

      if (!token) {
        this.sendUnauthorized(response);

        return;
      }

      const user = this.getUserFromToken(token);
    
      request['user'] = { ...user };

      next()
    } catch (error) {
      this.sendUnauthorized(response);
    } 
  }

  public isOperator = (request: Request, response: Response, next): void => {
    const token = this.getToken(request);

    try {
      const user = this.getUserFromToken(token);

      if (user.isOperator || user.isPlace) {
        request['user'] = { ...user };
        next();
      } else {
        this.sendUnauthorized(response);
      }
    } catch (error) {
      this.sendUnauthorized(response);
    }
  }

  private getToken = (request: Request): string => {
    const authorization = request.headers.authorization;
    const token = authorization.split(' ')[1];

    return token;
  }

  private getUserFromToken(token): IUser {
    const user: IUser = jwt.verify(`${token}`, 'secret');

    console.log(user);
    
    return user;
  }

  private sendUnauthorized = (response: Response) => {
    return response.status(401).send('Unauthorized');
  }
}

export default new AuthValidator();

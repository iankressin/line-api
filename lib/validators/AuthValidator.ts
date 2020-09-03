import { Request, Response } from 'express';
import { IUser } from '../schemas/User';
import jwt from 'jsonwebtoken';

class AuthValidator {
  public isUserSignedIn = (
    request: Request,
    response: Response,
    next
  ): void => {
    try {
      const token = this.getToken(request);

      console.log('Token: ', token);

      if (!token) {
        this.sendUnauthorized(response, '!token');

        return;
      }

      const user = this.getUserFromToken(token);

      if (!user) {
        this.sendUnauthorized(response, '!user');

        return;
      }

      request['user'] = { ...user };

      next();
    } catch (error) {
      this.sendUnauthorized(response, error.message);
    }
  };

  public isOperator = (request: Request, response: Response, next): void => {
    const token = this.getToken(request);

    try {
      const user = this.getUserFromToken(token);

      if (user.isOperator || user.isPlace) {
        request['user'] = { ...user };

        next();
      } else {
        this.sendUnauthorized(response, 'Not operator');
      }
    } catch (error) {
      this.sendUnauthorized(response, 'Regular error');
    }
  };

  private getToken = (request: Request): string => {
    const authorization = request.headers.authorization;
    const token = authorization.split(' ')[1];

    return token;
  };

  private getUserFromToken(token): IUser {
    const user: IUser = jwt.verify(`${token}`, 'secret');

    return user;
  }

  private sendUnauthorized = (response: Response, origin?: string) => {
    console.log('Sending unauthorized response!', origin);
    return response.status(401).send('Unauthorized');
  };
}

export default new AuthValidator();

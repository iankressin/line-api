import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

class AuthValidator {
  public isUserSignedIn(request: Request, response: Response, next): void {
    if (!request.session.user) {
      response.status(401);
      response.json({ message: 'Youre not authenticated' });
      throw new Error('Unauthorized');
    }

    next();
  }

  public isOperator(request: Request, response: Response, next): void {
    const authorization = request.headers.authorization;
    const token = authorization.split(' ')[1];

    try {
      const user = jwt.verify(`${token}`, 'secret');

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

  private sendUnauthorized(response: Response) {
    response.status(401);
    response.send('Unauthorized');
  }
}

export default new AuthValidator();

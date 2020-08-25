import { Request, Response } from 'express';

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
    if (!request.session.user || !request.session.user.isPlace) {
      response.status(401);
      response.json({ message: 'Youre not authenticated' });
      throw new Error('Not Authorized');
    }

    next();
  }
}

export default new AuthValidator();

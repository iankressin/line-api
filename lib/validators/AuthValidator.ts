import { Request, Response } from 'express'

class AuthValidator {
  public isUserSignedIn(request: Request, response: Response, next): void {
    if (!request.session.user) {
      response.status(401);
      response.json({ message: 'Você não está autenticado' })
      throw new Error('Not Authorized');
    }

    next();
  }

  public isOperator(request: Request, response: Response, next): void {
    if(!request.session.user || !request.session.user.isPlace)
      throw new Error('Not Authorized');

    next();
  }
}

export default new AuthValidator();

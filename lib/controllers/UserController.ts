import { Request, Response } from 'express';

import User from '../schemas/User';

class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const users = await User.find();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user = await User.create(request.body);

    return response.json(user);
  }

  public async createOffer(request: Request, response: Response) {
    const {
      tags,
      title,
      category,
      description,
      discoverable,
    } = request.body;
  
    await User.updateOne(
      { _id: request['user']._id },
      { 
        $set: {
          discoverable,
          offering: {
            category,
            title,
            description,
            tags,
          }
        },
      } 
    );
    
    return response.status(204).send();
  }
}

export default new UserController();

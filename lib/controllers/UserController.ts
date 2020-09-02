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

  public createOffer = async (request: Request, response: Response): Promise<Response> => { 
    try {
      const servicePayload = request.body;

      await this.createService(servicePayload, request['user']._id, 'offer');

      return response.status(204).send();
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: error.message });
    }
  }

  public async createDemand(request: Request, response: Response) {
      try {
        const servicePayload = request.body;

        await this.createService(servicePayload, request['user']._id, 'demand');

        return response.status(204).send();
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    return response.status(204).send();
  }

  // A service is either an offer or a demand
  // TODO: create an interface for servicePayload
  private async createService(servicePayload, userId: string, serviceType: string) {
    const {
      tags,
      title,
      category,
      description,
      discoverable,
    } = servicePayload;
  
    await User.updateOne(
      { _id: userId },
      { 
        $set: {
          discoverable,
          [serviceType]: {
            category,
            title,
            description,
            tags,
          }
        },
      } 
    );
  }
}

export default new UserController();

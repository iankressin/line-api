import { Request, Response } from 'express';

import Place from '../schemas/Place';

class PlaceController {
  public async index(req: Request, res: Response): Promise<Response> {
    const places = await Place.find().populate({
      path: 'queue',
      model: 'User',
    });

    return res.json(places);
  }

  public async get(req: Request, res: Response): Promise<Response> {
    const placeId = req.params.placeId;
    console.log(placeId);

    const place = await Place.findById(placeId).populate({
      path: 'queue',
      model: 'User',
    });

    return res.json(place);
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const place = await Place.create(req.body);

    return res.json(place);
  }
}

export default new PlaceController();


import { Request, Response } from 'express';

import Place from '../schemas/Place';
import User from '../schemas/User';

class QueueController {
  public async enqueue(req: Request, res: Response): Promise<Response> {
    const { placeId, userId } = req.body;

    const place = await Place.findById(placeId); 

    if (place.queue.includes(userId)) {
      throw new Error('Already enqueued');
    }

    const position = place.queue.push(req.body.userId);
    const result = await place.save();

    return res.json({ position });
  }

  public async dequeue(req: Request, res: Response): Promise<Response> {
    const placeId = req.params.placeId;

    const place = await Place.findById(placeId);

    const userId = place.queue.shift();
    await place.save();

    const next = await User.findById(userId);

    return res.json({ next });
  }
}

export default new QueueController();

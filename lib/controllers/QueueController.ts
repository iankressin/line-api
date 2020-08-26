import { Request, Response } from 'express';
import { io } from '../server';

import Place from '../schemas/Place';
import User from '../schemas/User';

class QueueController {
  public async enqueue(req: Request, res: Response): Promise<Response> {
    const placeId = req.body.placeId;
    const userId = req.session.user._id;

    const place = await Place.findById(placeId);

    if (place.queue.includes(userId)) {
      return res.status(500).send({
        message: 'Você já está na fila.',
      });
    }

    const position = place.queue.push(userId);
    const result = await place.save();

    await User.update(
      { _id: userId },
      { $set: { lastTimeInQueue: new Date() } }
    );

    return res.json(result);
  }

  public async dequeue(req: Request, res: Response): Promise<Response> {
    const placeId = req.session.user.placeId;

    const place = await Place.findById(placeId);

    const userId = place.queue.shift();
    await place.save();

    const next = await User.findById(userId);

    io.emit('next', next);

    await User.update(
      { _id: userId },
      { $set: { lastTimeCalled: new Date() } }
    );

    return res.json(next);
  }
}

export default new QueueController();

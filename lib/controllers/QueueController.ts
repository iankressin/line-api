import { Request, Response } from 'express';
import { Document } from 'mongoose';

import { io } from '../server';
import User from '../schemas/User';
import Place, { IPlace } from '../schemas/Place';
import QueueProvider from '../providers/QueueProvider';

class QueueController {
  private placeId: string;
  private place: any;
  private userId: string;

  public enqueue = async (request: Request, response: Response): Promise<Response> => {
    this.placeId = request.body.placeId;
    this.userId = request['user']._id;

    this.place = await Place.findById(this.placeId);

    if (!this.place) {
      return this.sendError(response, 'Estabelecimento não encontrado');
    }

    if (this.place.queue.includes(this.userId)) {
      return this.sendError(response, 'Voce ja esta na fila');
    }

    const position = this.place.queue.push(this.userId);
    const result = await this.place.save();

    await User.updateOne(
      { _id: this.userId },
      { $set: { lastTimeInQueue: new Date() } }
    );

    return response.json(result);
  }

  public dequeue = async (request: Request, response: Response): Promise<Response> => {
    this.placeId = request['user'].placeId;
    this.place = await Place.findById(this.placeId);

    if (!this.place) {
      return this.sendError(response, 'Estabelecimento não encontrado');
    }

    this.userId = this.place.queue.shift();

    const nextUser = await User.findById(this.userId);

    io.emit('next', nextUser);

    await User.updateOne(
      { _id: this.userId },
      { $set: { lastTimeCalled: new Date() } }
    );

    nextUser.lastTimeCalled = new Date();

    const currentAvarage = Math.abs(
      nextUser.lastTimeCalled - nextUser.lastTimeInQueue
    );

    this.place.avarageWaitingTime = QueueProvider.calculateAvarageWaiting(
      currentAvarage,
      this.place.avarageWaitingTime,
      nextUser.totalUses,
    );

    if (!this.place.totalUses) {
      this.place.totalUses = 1;
    } else {
      this.place.totalUses = this.place.totalUses + 1;
    }

    await this.place.save();

    return response.json({ next: nextUser });
  }

  private sendError = (response: Response, message: string) => {
    return response.status(500).json({ message });
  }
}

export default new QueueController();

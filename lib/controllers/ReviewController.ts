import { Request, Response } from 'express';
import { Types } from 'mongoose';

import Review from '../schemas/Reviews';

class ReviewController {
  public async create(request: Request, response: Response) {
    const userId = request.session.user._id;
    const { placeId, score } = request.body;
    const review = await Review.create({ user: userId, place: placeId, score });

    response.json({ review });
  }

  public async list(request: Request, response: Response) {
    const placeId = request.session.user.placeId;

    const reviews = await Review.find({ place: placeId });

    response.json({ reviews });
  }

  public async groupedScores(request: Request, response: Response) {
    const placeId = Types.ObjectId(request['user'].placeId);

    const scores = await Review.aggregate([
      { $match: { place: placeId } },
      {
        $group: {
          _id: '$score',
          count: { $sum: 1 },
        },
      },
    ]);

    response.json({ scores });
  }

  public async groupedUsersByScore(request: Request, response: Response) {
    const score = Number(request.params.score);
    const placeId = Types.ObjectId(request['user'].placeId);

    const users = await Review.aggregate([
      { $match: { score, place: placeId } },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
    ]);

    response.json({ users });
  }

  public async nps(request: Request, response: Response) {
    const placeId = Types.ObjectId(request['user'].placeId);
    let promoters = 0,
      neutrals = 0,
      detractors = 0;

    const reviews = await Review.find({ place: placeId });

    reviews.forEach(review => {
      if (review.score >= 9) promoters++;
      if (review.score <= 6) detractors++;
      if (review.score === 8 || review.score === 7) neutrals++;
    });

    const nps = (promoters - detractors) / reviews.length;

    response.json({
      promoters,
      neutrals,
      detractors,
      total: reviews.length,
      nps,
    });
  }
}

export default new ReviewController();

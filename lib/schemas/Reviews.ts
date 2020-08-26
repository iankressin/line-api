import { Schema, model, Document } from 'mongoose';

interface IReview extends Document {
  user: Schema.Types.ObjectId;
  place: Schema.Types.ObjectId;
  score: number;
}

const ReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    place: {
      type: Schema.Types.ObjectId,
      ref: 'Place',
    },
    score: Number,
  },
  { timestamps: true }
);

export default model<IReview>('Review', ReviewSchema);

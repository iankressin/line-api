import { Schema, model, Document, Types } from 'mongoose';

import User from './User';

interface IPlace extends Document {
  email: string,
  name: string,
  state: string,
  cnpj: string,
  queue: Schema.Types.ObjectId[],
}

const PlaceSchema = new Schema({
  email: String,
  name: String,
  state: String,
  cnpj: String, 
  queue: {
    type: [Schema.Types.ObjectId],
    ref: 'users',
    default: [],
  },
}, {
  timestamps: true
})

export default model<IPlace>('Place', PlaceSchema);

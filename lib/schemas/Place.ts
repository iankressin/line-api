import { Schema, model, Document } from 'mongoose';

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
    ref: 'User',
    default: [],
  },
}, {
  timestamps: true
})

export default model<IPlace>('Place', PlaceSchema);

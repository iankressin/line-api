import { Schema, model, Document } from 'mongoose';

interface IPlace extends Document {
  email: string,
  name: string,
  state: boolean,
  cnpj: string,
  queue: Schema.Types.ObjectId[],
}

const PlaceSchema = new Schema({
  email: String,
  name: String,
  open: { type: Boolean, default: false},
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

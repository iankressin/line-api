import { Schema, model, Document } from 'mongoose';

interface IPlace extends Document {
  email: string;
  name: string;
  imagePath: string;
  state: boolean;
  cnpj: string;
  phoneNumber: string;
  address: string;
  city: string;
  stateOrProvince: string;
  queue: Schema.Types.ObjectId[];
}

const PlaceSchema = new Schema(
  {
    email: String,
    name: String,
    imagePath: String,
    open: { type: Boolean, default: false },
    cnpj: String,
    phoneNumber: String,
    address: String,
    city: String,
    stateOrProvince: String,

    queue: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default model<IPlace>('Place', PlaceSchema);

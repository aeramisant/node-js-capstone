import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: { type: String, required: true },
  },
  { _id: false }
);
export default mongoose.model('Exercise', exerciseSchema);

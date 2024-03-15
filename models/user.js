import mongoose from 'mongoose';
import Exercise from './exercise.js';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
  },
  log: [Exercise.schema],
});

export default mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const Exercise = require('./exercise');
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
module.exports = mongoose.model('User', userSchema);

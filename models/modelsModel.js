import mongoose from 'mongoose';
const { Schema } = mongoose;

const modelSchema = new Schema({
  model: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  hour_price: {
    type: Number,
    required: true,
  },
});

const Model = mongoose.model('model', modelSchema);
export default Model;

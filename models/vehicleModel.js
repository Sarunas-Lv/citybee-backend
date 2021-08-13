import mongoose from 'mongoose';
const { Schema } = mongoose;

const vehicleSchema = new Schema({
  car_id: mongoose.Types.ObjectId,
  model: {
    type: String,
    required: true,
  },
  number_plate: {
    type: String,
    required: true,
  },
  country_location: {
    type: String,
    required: true,
  },
});

const Vehicle = mongoose.model('vehicle', vehicleSchema);
export default Vehicle;

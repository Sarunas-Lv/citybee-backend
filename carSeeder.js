import mongoose from 'mongoose';
import Vehicle from './models/vehicleModel.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    let vehicle = {
      model: '1',
      number_plate: 'EEJ113',
      country_location: 'LT',
    };

    Vehicle.insertMany(vehicle);

    console.log('Vechicle was sent to MongoDB');
  });

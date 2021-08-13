import mongoose from 'mongoose';
import Model from './models/modelsModel.js';
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
      model: '2',
      number_plate: 'TTT333',
      country_location: 'LT',
    };

    let model = { model: '2', name: 'BMW X4', hour_price: 6.9 };

    Model.insertMany(model);
    Vehicle.insertMany(vehicle);

    console.log('Data was sent to MongoDB');
  });

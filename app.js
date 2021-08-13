// Imports
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import Model from './models/modelsModel.js';
import Vehicle from './models/vehicleModel.js';
// Starters
dotenv.config();
// Variables
const app = express();
const PORT = process.env.PORT;
// Middlewares
app.use(cors());
app.use(express.json());
// Connecting DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => {
    // starting server
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  });
// Controllers
//Routes
// GET
app.get('/', (req, res) => {
  res.send('API is running go and catch it ;)');
});
// // GET /models (paduos visus modelius - auto kaina be PVM);
app.get('/models', (req, res) => {
  Model.find({}).then((data) => res.json(data));
});
// // GET /modelscount (grąžins visus modelius ir kiek automobilių turi šie modeliai);
app.get('/modelscount', (req, res) => {
  Vehicle.find().then((data) => {
    // prisipazinsiu radau sita nete 
    const modelCount = (arr, key) => {
      let arr2 = [];

      arr.forEach((item) => {
        if (
          arr2.some((name) => {
            return name[key] == item[key];
          })
        ) {
          arr2.forEach((count) => {
            if (count[key] === item[key]) {
              count['count']++;
            }
          });
        } else {
          let times = {};
          times[key] = item[key];
          times['count'] = 1;
          arr2.push(times);
        }
      });

      return arr2;
    };
    let arr = data;
    let key = 'model';
    res.json(modelCount(arr, key));
  });
});
// // GET /vehicles (paduos visus automobilius, kur model_id taps model name ir hour_price [su join padaryti]). Čia, automobilių kaina grąžinama su PVM.
app.get('/vehicles', async (req, res) => {
  Vehicle.find({}).then((data) => res.json(data));
});
// // GET /vechicles/:country paduos automobilius pagal nurodytą šalį
app.get('/vehicles/:country_location', (req, res) => {
  let countryLocation = req.params.country_location.toUpperCase();
  Vehicle.find({ country_location: countryLocation }).then((data) =>
    res.json(data)
  );
});
// // POST
// // POST /models (leis įrašyti naują modelį);
app.post('/models', (req, res) => {
  const model = req.body;

  Model.find().then((result) => {
    const modelExists = result.some(
      (modelFromDB) => modelFromDB.name === model.name
    );
    if (modelExists) {
      res.json({
        creationStatus: 'fail',
        message: 'Given model already exists',
      });
    } else {
      const newModel = new Model(model);

      newModel.save().then((result) => {
        res.json({
          creationStatus: 'success',
          message: 'New model created',
        });
      });
    }
  });
});
// // POST /vehicles (įrašyti naują automobilį);
app.post('/vehicles', (req, res) => {
  const vehicle = req.body;

  Vehicle.find().then((result) => {
    const modelExists = result.some(
      (carFromDB) => carFromDB.name === vehicle.name
    );
    const newModel = new Vehicle(vehicle);

    newModel.save().then((result) => {
      let { _id } = result;
      res.json({
        creationStatus: 'success',
        message: 'New model created',
        _id: _id,
      });
    });
  });
});

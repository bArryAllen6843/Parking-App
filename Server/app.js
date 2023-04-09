const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const parkingSchema = new mongoose.Schema({
  id: Number,
  vehicleType: String,
  parkTime: Number,
  parkingDate: String,
  vehicleNumber: String,
});

const Parking = mongoose.model("Parking", parkingSchema);

mongoose
  .connect('mongodb://127.0.0.1:27017/myParkingDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(bodyParser.json());

// we are taking id's of booked slots from collections of database
app.get("/parkings", async (req, res) => {
  try {
    const parkingData = await Parking.find();
    res.json(parkingData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to load IDs")
  }
});

// post route for parking details
app.post("/parkings", async (req, res) => {
    const data = req.body;
    const newParking = new Parking({
      id: data.id,
      vehicleType: data.vehicleType,
      parkTime: data.parkTime,
      parkingDate: data.parkingDate,
      vehicleNumber: data.vehicleNumber,
    });
    try {
      const result = await newParking.save();
      console.log("Parking data saved successfully: ", result);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to save parking data");
    }
});



app.listen(5000, () => {
  console.log("server running at 5000");
});
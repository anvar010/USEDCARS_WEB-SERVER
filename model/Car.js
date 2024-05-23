import mongoose from "mongoose";

const sellYourCarSchema = new mongoose.Schema({
    carregnumber: {
      type: String,
      required: true,
      match: /^[A-Za-z0-9]+$/,
      uppercase: true
    },
    brand: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    fuelType: {
      type: String,
      required: true
    },
    registeredYear: {
      type: String,
      required: true
    },
    kmDriven: {
      type: String,
      required: true
    },
    expectedPrice: {
      type: String,
      required: true
    }
  });

const SellYourCar = mongoose.model("SellYourCar", sellYourCarSchema);

export default SellYourCar;

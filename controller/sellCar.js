import SellYourCar from "../model/Car.js";

export const submitCarDetails = async (req, res) => {
  try {
    const { carregnumber, brand, model, fuelType, registeredYear, kmDriven, expectedPrice } = req.body;

    const newCarDetails = new SellYourCar({
        carregnumber,
      brand,
      model,
      fuelType,
      registeredYear,
      kmDriven,
      expectedPrice
    });

    await newCarDetails.save();

    return res.status(201).send({
      message: "Car details submitted successfully",
      data: newCarDetails,
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error submitting car details",
      success: false
    });
  }
};

export const getAllCarDetails = async (req, res) => {
    try {
      const allCarDetails = await SellYourCar.find();
      
      return res.status(200).send({
        message: "All car details retrieved successfully",
        data: allCarDetails,
        success: true
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Error retrieving car details",
        success: false
      });
    }
  };

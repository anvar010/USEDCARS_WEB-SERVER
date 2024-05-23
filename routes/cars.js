import express from "express";
import { getAllCarDetails, submitCarDetails } from "../controller/sellCar.js";

const router = express.Router();

router.post("/submit", submitCarDetails);
router.get("/car-details", getAllCarDetails);

export default router;

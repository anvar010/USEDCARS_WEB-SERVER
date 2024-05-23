import express from "express";
import userController from "../controller/user.js";

const router = express.Router();

router.post("/register", userController.registerController);
router.post("/login", userController.loginController);
router.get("/getData", userController.getUserDataController);

export default router;

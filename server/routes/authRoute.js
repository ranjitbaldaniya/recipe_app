import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

const authRoute = express.Router();

// Register a new user
authRoute.post("/register", registerController);

// Login route
authRoute.post("/login", loginController);


export default authRoute;

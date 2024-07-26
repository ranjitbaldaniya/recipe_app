// routes/authRoute.js
import express from 'express';
import {
  loginController,
  registerController,
  forgotPasswordController,
  resetPasswordController
} from '../controllers/authController.js';

const authRoute = express.Router();

// Register a new user
authRoute.post('/register', registerController);

// Login route
authRoute.post('/login', loginController);

// Forgot password route
authRoute.post('/forgot-password', forgotPasswordController);

// Reset password route
authRoute.post('/reset-password/:token', resetPasswordController);

export default authRoute;

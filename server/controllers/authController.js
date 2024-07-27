import bcrypt from "bcryptjs";
import { UserModel } from "../models/userModel.js";
import generateToken from "../utils/jwtToken.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();

const randomBytesAsync = promisify(crypto.randomBytes);

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const token = (await randomBytesAsync(20)).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: 'xarg vrod ltdt vjmj'
      },
    });
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             ${resetLink}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('There was an error: ', err);
        return res.status(500).json({ message: 'Error sending email' });
      }

      res.status(200).json({ message: 'Recovery email sent' });
    });
  } catch (error) {
    console.error('Internal server error: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Find user with the reset token and check if token is expired
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Set the new password and clear the reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const registerController = async (req, res) => {
  // console.log("req.body ==>", req.body);

  const { user_name, email, password, gender, role } = req.body;

  try {
    // Check if the user with the email already exists
    let user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log("hashed password ==>", hashedPassword);
    // Create new user instance with hashed password
    user = new UserModel({
      user_name,
      email,
      password: hashedPassword,
      gender,
      role,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // If credentials are correct, generate JWT token
    const payload = {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };

    const token = await generateToken(payload);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        role: user.role,
        user_name:user.user_name
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

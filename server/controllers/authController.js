import bcrypt from "bcryptjs";
import { UserModel } from "../models/userModel.js";
import generateToken from "../utils/jwtToken.js";

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

    res.status(200).json({ message: "Login successful", token , userId : user._id });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

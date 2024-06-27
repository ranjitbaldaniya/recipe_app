import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/dbConfig.js";
import userRoutes from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", authRoute);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/dbConfig.js";
import userRoutes from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import recipeRoute from "./routes/recipeRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import favoriteRoute from "./routes/favoriteRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
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
app.use("/recipe", recipeRoute);
app.use("/category", categoryRoute);
app.use("/favorite", favoriteRoute);
app.use("/review", reviewRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";

import { approveReview, rejectReview, getPendingReviews } from "../controllers/reviewController.js";

const adminRoute = express.Router();

adminRoute.put("/approve/:id", approveReview);
adminRoute.delete("/reject/:id", rejectReview);
adminRoute.get("/pending", getPendingReviews);
  


export default adminRoute;

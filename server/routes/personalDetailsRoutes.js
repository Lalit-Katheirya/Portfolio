import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { getPersonalDetailsController } from "../controllers/personalDetailsController.js";

export const personalDetailsRoutes = express.Router();

personalDetailsRoutes.get(
  "/",
  asyncHandler(getPersonalDetailsController)
);


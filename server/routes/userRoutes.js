import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import {
  getUserData,
  storeRecentSearchedCities,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUserData);
userRouter.post("/store-recent-search", protect, storeRecentSearchedCities);

export default userRouter;

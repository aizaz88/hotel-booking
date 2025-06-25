import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleWare.js";
import { createRoom } from "../controller/roomcontroller.js";
const roomRouter = express.Router();

roomRouter.post("/", upload.array("images", 4), protect, createRoom);

export default roomRouter;

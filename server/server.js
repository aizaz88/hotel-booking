// server.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./configs/db.js";
import clerkWebhooks from "./controller/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

connectDB();
connectCloudinary();

const app = express();
app.use(cors());

// 🟡 Must come BEFORE express.json()
app.use("/api/clerk", bodyParser.raw({ type: "application/json" }));

// ⬇ Middleware for all other routes
app.use(express.json());
app.use(clerkMiddleware());

// ✅ Webhook route
app.post("/api/clerk", clerkWebhooks);

//////////ROUTES api/clerk
app.get("/", (req, res) => res.send("API is Working..."));
app.use("/api/user", userRouter);
app.use("api/hotels", hotelRouter);
app.use("api/rooms", roomRouter);
app.use("api/bookings", bookingRouter);

////////////////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

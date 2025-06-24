import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js"; // <-- fixed
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controller/clerkWebhooks.js";
connectDB();

const app = express();
app.use(cors());

//Middle Ware
app.use(express.json());
app.use(clerkMiddleware());

////////////////////////////////
//API to listen to CLERK WEBHOOKS
app.use("/api/clerk", clerkWebhooks);
app.get("/", (req, res) => res.send("API is Working ..."));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));

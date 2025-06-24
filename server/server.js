// server.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./configs/db.js";
import clerkWebhooks from "./controller/clerkWebhooks.js";

connectDB();

const app = express();
app.use(cors());

// 🟡 Must come BEFORE express.json()
app.use("/api/clerk", bodyParser.raw({ type: "application/json" }));

// ⬇ Middleware for all other routes
app.use(express.json());
app.use(clerkMiddleware());

// ✅ Webhook route
app.post("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => res.send("API is Working..."));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

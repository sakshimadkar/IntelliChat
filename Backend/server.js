import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";

// 🔹 Force dotenv load
dotenv.config({ path: "./.env" });

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

// API routes
app.use("/api", chatRoutes);

// 🔹 Debug env
console.log("MONGO_URI VALUE 👉", process.env.MONGO_URI);

// 🔹 Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((err) => {
        console.error("Mongo connection error:", err.message);
    });


import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { adminRoute, authRoute, showsRoute } from "./routes/routes.js";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();

// app.use((req, res, next) => setTimeout(next, 5000));
const frontendPath = path.resolve("../frontend/dist");

app.use(express.static(frontendPath));

app.get("/{*path}", (req, res, next) => {
    if (req.path.startsWith("/api/")) {
        return next();
    }

    res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`)
});
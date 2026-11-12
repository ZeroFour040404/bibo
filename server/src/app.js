import express from "express";
import cors from "cors";
import { config } from "./config.js";

const app = express();
app.use(cors({
    origin: config.CLIENT_URL
}));
app.use(express.json());

app.get("/api/health", (request, response) => {
    response.json({ status: "OK" });
});

export { app };
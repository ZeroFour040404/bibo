import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { taskRoutes } from "./routes/taskRoutes.js";

const app = express();
app.use(cors({
    origin: config.CLIENT_URL
}));
app.use(express.json());

app.get("/api/health", (request, response) => {
    response.json({ status: "OK" });
});

app.use("/api/tasks", taskRoutes);

export { app };
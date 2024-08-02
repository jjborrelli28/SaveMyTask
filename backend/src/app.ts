import express from "express";
import cors from "cors";
import router from "./routes";
import delay from "./middleware/delay";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_HOST,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
if (process.env.NODE_ENV === "development")
  app.use((req, res, next) => delay(req, res, next, 500));

app.use(express.json());
app.use("/api", router);

export default app;

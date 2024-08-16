import cors from "cors";
import express from "express";
import delay from "./middleware/delay";
import router from "./routes";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_HOST,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
if (process.env.NODE_ENV === "development")
  app.use((req, res, next) => delay(req, res, next, 500));

app.use(express.json());
app.use("/api", router);

export default app;

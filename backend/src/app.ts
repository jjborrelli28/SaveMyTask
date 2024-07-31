import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_HOST,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/api", router);

export default app;

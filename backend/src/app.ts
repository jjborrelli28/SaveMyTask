import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import runInDevelopmentEnv from "./helpers/run-in-development-env";
import delay from "./middleware/delay";
import router from "./routes";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_HOST,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
  cookieParser(),
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://trusted-cdn.com"],
      styleSrc: ["'self'", "https://trusted-cdn.com"],
      imgSrc: ["'self'", "https://trusted-cdn.com"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'none'"],
    },
  })
);

runInDevelopmentEnv(() =>
  app.use((req, res, next) => delay(req, res, next, 500))
);

app.use(express.json());
app.use("/api", router);

export default app;

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import { router as authRouter } from "./routes/auth.route.js";
import { router as userRouter } from "./routes/user.route.js";
import { router as anyalsisRouter } from "./routes/anyalsis.route.js";
import { expressjwt } from "express-jwt";
import { globalCatch } from "./middlewares/globalCatch.middleware.js";
import cors from "cors";

const app = express();

const { JWT_SECRET, VERSION, CLIENT_URI } = process.env;

if (!JWT_SECRET || !VERSION) {
  throw new Error("Missing required environment variables");
}

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: CLIENT_URI,
    credentials: true,
  }),
);



app.use(
  expressjwt({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
    getToken: (req) => {
      if (req.cookies && req.cookies.token) {
        return req.cookies.token;
      }
      return null;
    },
  }).unless({
    path: [
      `${VERSION}/auth/signup`,
      `${VERSION}/auth/login`,
      `${VERSION}/auth/status`,
      `${VERSION}/auth/anyalsis/analyze`,
    ],
  }),
);

// Routes
app.use(`${VERSION}/auth`, authRouter);
app.use(`${VERSION}/user`, userRouter);
app.use(`${VERSION}/anyalsis`, anyalsisRouter);

// Global catch
app.use(globalCatch);

export { app };

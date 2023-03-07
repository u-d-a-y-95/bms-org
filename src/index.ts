import dotenv from "dotenv";
dotenv.config();

import express, { Application, NextFunction, Request, Response } from "express";
import { rootRouter } from "./routes";

const app: Application = express();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.headers["user"]) {
    req.user = JSON.parse(String(req.header("user")));
  }
  next();
});

app.use("/", rootRouter);

app.get("/test", (req: Request, res: Response) => {
  res.json("bms-org is running good");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`bms-org service is running on ${port}`);
});

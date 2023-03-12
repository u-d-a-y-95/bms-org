import dotenv from "dotenv";
dotenv.config();

import express, { Application, NextFunction, Request, Response } from "express";
import { rootRouter } from "./routes";
import { mq } from "./mq";

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




app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("ok")
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`bms-org service is running on ${port}`);
});

import dotenv from "dotenv";
dotenv.config();

import express, { Application, NextFunction, Request, Response } from "express";

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
    next();
  }
});
app.get("/", (req: Request, res: Response) => {
  res.json("bms-org is runnig good");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`bms-org service is running on ${port}`);
});

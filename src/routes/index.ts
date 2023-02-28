import express, { Router } from "express";
import { companyRouter } from "./company";

export const rootRouter: Router = express.Router();


// 
rootRouter.use("/company",companyRouter)


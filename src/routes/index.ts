import express, { Router } from "express";
import { signup } from "../controllers/auth";
import { companyRouter } from "./company";

export const rootRouter: Router = express.Router();


// 
rootRouter.post("/signup",signup)
rootRouter.use("/company",companyRouter)


import express, { Router } from "express";
import { getAllCompany } from "../controllers/company";

export const companyRouter: Router = express.Router();

companyRouter.get("/", getAllCompany);

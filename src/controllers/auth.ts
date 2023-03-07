import { Request, Response } from "express";
import { Company } from "../services/company";
import { Employee } from "../services/employee";

export const signup = async (req: Request, res: Response) => {
  const { company, employee } = req.body;
  const companyObj = new Company();
  const employeeObj = new Employee();
  const newCompany = await companyObj.create(company);
  console.log(newCompany);
  employee["companyId"] = newCompany.id;
  employee["role"] = "OWNER";
  const newEmployee = await employeeObj.create(employee);
  res.json(newEmployee);
};

import { Request, Response } from "express";
import { ADD_USER } from "../const/mq-events";
import { mq } from "../mq";
import { Company } from "../services/company";
import { Employee } from "../services/employee";
import { gethashed } from "../utils/bcrypt";

export const signup = async (req: Request, res: Response) => {
  const { company, employee } = req.body;
  const companyObj = new Company();
  const employeeObj = new Employee();
  const newCompany = await companyObj.create(company);
  employee["companyId"] = newCompany.id;
  employee["role"] = "OWNER";
  employee["password"] = await gethashed(employee.password);
  const newEmployee = await employeeObj.create(employee);
  mq.sendQueue(ADD_USER, newEmployee);
  res.json(newEmployee);
};

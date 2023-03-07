import { prisma } from "../db";
import { Employee as IEmployee } from "@prisma/client";

export class Employee {
  create(employe: IEmployee) {
    return prisma.employee.create({
      data: employe,
    });
  }
}

import { prisma } from "../db";
import { Company as ICompany } from "@prisma/client";
export class Company {
    
  create(company: ICompany) {
    return prisma.company.create({
      data: company,
    });
  }
}

import { CustomError } from "../../utils/CustomError";
import { getPagination, Pagination } from "../../utils/pagination";
import User from "../auth/models/user.model";
import Company from "./models/company.model";
import Representative from "./models/representative.model";

export class CompanyService {
  constructor(
    private companyModel: typeof Company = Company,
    private representativeModel: typeof Representative = Representative,
    private userModel: typeof User = User
  ) {}

  async deleteCompany(
    companyId: string,
    userId: string
  ): Promise<Company | null> {
    const company = await this.companyModel.findOne({
      where: { id: companyId },
    });
    if (!company) throw new CustomError("Company not found", 404);
    if (company.owner_id !== userId) throw new CustomError("Unauthorized", 401);
    await company.destroy();
    return company;
  }

  async reopenCompany(
    companyId: string,
    userId: string
  ): Promise<Company | null> {
    const company = await this.companyModel.findOne({
      where: { id: companyId },
    });
    if (!company) throw new CustomError("Company not found", 404);
    if (company.owner_id !== userId) throw new CustomError("Unauthorized", 401);
    await company.restore();
    return company;
  }

  async updateCompany(
    companyId: string,
    userId: string,
    companyData: Partial<Company>
  ): Promise<Company | null> {
    const company = await this.companyModel.findOne({
      where: { id: companyId },
    });
    if (!company) throw new CustomError("Company not found", 404);
    if (company.owner_id !== userId) throw new CustomError("Unauthorized", 401);
    await company.update(companyData);
    return company;
  }

  async addRepresentative(
    companyId: string,
    userId: string,
    representativeId: string
  ): Promise<Representative | null> {
    const company = await this.companyModel.findOne({
      where: { id: companyId },
    });
    if (!company) throw new CustomError("Company not found", 404);
    if (company.owner_id !== userId) throw new CustomError("Unauthorized", 401);
    const user = await this.userModel.findOne({
      where: { id: representativeId },
    });
    if (!user) throw new CustomError("User not found", 404);
    const representative = await this.representativeModel.create({
      user_id: representativeId,
      company_id: companyId,
    });
    return representative;
  }

  async removeRepresentative(
    companyId: string,
    userId: string,
    representativeId: string
  ): Promise<Representative | null> {
    const company = await this.companyModel.findOne({
      where: { id: companyId },
    });
    if (!company) throw new CustomError("Company not found", 404);
    if (company.owner_id !== userId) throw new CustomError("Unauthorized", 401);
    const representative = await this.representativeModel.findOne({
      where: { user_id: representativeId, company_id: companyId },
    });
    if (!representative) throw new CustomError("Representative not found", 404);
    await representative.destroy();
    return representative;
  }

  async getCompanies(
    limit: number = 10,
    offset: number = 0
  ): Promise<{ companies: Company[]; pagination: Pagination }> {
    const companies = await this.companyModel.findAll({
      offset,
      limit,
    });
    const count = await this.companyModel.count();
    const pagination = getPagination(count, limit, offset);
    return { companies, pagination };
  }

  async getCompany(
    companyId: string
  ): Promise<Company | null> {
    const company = await this.companyModel.findOne({
      where: { id: companyId },
    });
    return company;
  }

  async getCompaniesByUser(
    userId: string
  ): Promise<Company[]> {
    const companies = await this.companyModel.findAll({
      where: { owner_id: userId },
    });
    return companies;
  }

  async getCompaniesByRepresentative(
    userId: string
  ): Promise<Company[]> {
    // Get the representatives of the user
    const representatives = await this.representativeModel.findAll({
      where: { user_id: userId },
    });
    // Get the company IDs from the representatives
    const companyIds = representatives.map((representative) => representative.company_id);

    // Get the companies from the company IDs
    const companies = await this.companyModel.findAll({
      where: { id: companyIds },
    });
    return companies;
}

  async getCompaniesByIndustry(
    industryId: string
  ): Promise<Company[]> {
    const companies = await this.companyModel.findAll({
      where: { industry_id: industryId },
    });
    return companies;
  }

}

import { Sequelize, Transaction } from "sequelize";
import { Op } from "sequelize";
import User from "../../auth/models/user.model";
import Company from "../models/company.model";
import CompanyRequest from "../models/company-request.model";
import { v4 as uuid } from "uuid";
import { CustomError } from "../../../utils/CustomError";
import db from "../../../config/database";

export class CompanyRequestService {
  constructor(
    private companyRequestModel: typeof CompanyRequest = CompanyRequest,
    private companyModel: typeof Company = Company,
    private userModel: typeof User = User,
    private sequelize: Sequelize = db
  ) {}

  async getCompanyRequests(
    limit: number,
    offset: number,
    search: string = "",
    status?: string
  ): Promise<CompanyRequest[]> {
    const whereClause: any = {};

    if (status) {
      whereClause.status = status;
    }

    if (search) {
      whereClause[Op.or] = [
        {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },
        {
          description: {
            [Op.iLike]: `%${search}%`,
          },
        },
      ];
    }

    const companyRequests = await this.companyRequestModel.findAll({
      limit,
      offset,
      where: whereClause,
    });

    return companyRequests;
  }

  async getCompanyRequestById(
    requestId: string
  ): Promise<CompanyRequest | null> {
    const companyRequest = await this.companyRequestModel.findOne({
      where: { id: requestId },
    });

    return companyRequest;
  }

  async approveCompanyRequest(
    requestId: string
  ): Promise<CompanyRequest | null> {
    const transaction: Transaction = await this.sequelize.transaction();
    try {
      const companyRequest = await this.companyRequestModel.findOne({
        where: { id: requestId },
        transaction,
      });

      if (!companyRequest) {
        throw new CustomError("Company request not found", 404);
      }

      if (companyRequest.status !== "pending") {
        throw new CustomError(
          "Company request is already approved or rejected",
          400
        );
      }

      const company = await this.companyModel.create(
        {
          id: uuid(),
          request_id: companyRequest.id,
          owner_id: companyRequest.user_id,
          name: companyRequest.name,
          description: companyRequest.description,
          industry_id: companyRequest.industry_id,
          profile_picture: companyRequest.profile_picture,
          website_url: companyRequest.website_url,
          phone_number: companyRequest.phone_number,
          address: companyRequest.address,
          established_date: companyRequest.established_date,
          company_size: companyRequest.company_size,
          mission_statement: companyRequest.mission_statement,
        },
        { transaction }
      );

      if (!company) {
        throw new CustomError("Failed to create company", 500);
      }

      await companyRequest.update({ status: "approved" }, { transaction });

      await transaction.commit();

      return companyRequest;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async rejectCompanyRequest(
    requestId: string
  ): Promise<CompanyRequest | null> {
    const companyRequest = await this.companyRequestModel.findOne({
      where: { id: requestId },
    });

    if (!companyRequest) {
      throw new CustomError("Company request not found", 404);
    }

    if (companyRequest.status !== "pending") {
      throw new CustomError(
        "Company request is already approved or rejected",
        400
      );
    }

    await companyRequest.update({ status: "rejected" });

    return companyRequest;
  }

  async deleteCompanyRequest(
    requestId: string
  ): Promise<CompanyRequest | null> {
    const companyRequest = await this.companyRequestModel.findOne({
      where: { id: requestId },
    });

    if (!companyRequest) {
      throw new CustomError("Company request not found", 404);
    }

    await companyRequest.destroy();

    return companyRequest;
  }

  async applyForCompanyRequest(
    userId: string,
    companyRequestData: Partial<CompanyRequest>
  ): Promise<CompanyRequest | null> {
    const user = await this.userModel.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    const companyRequest = await this.companyRequestModel.create({
      id: uuid(),
      user_id: userId,
      name: companyRequestData.name as string,
      description: companyRequestData.description,
      industry_id: companyRequestData.industry_id,
      profile_picture: companyRequestData.profile_picture,
      website_url: companyRequestData.website_url,
      phone_number: companyRequestData.phone_number,
      address: companyRequestData.address,
      established_date: companyRequestData.established_date,
      company_size: companyRequestData.company_size,
      mission_statement: companyRequestData.mission_statement,
      status: "pending",
    });

    if (!companyRequest) {
      throw new CustomError("Failed to create company request", 500);
    }

    return companyRequest;
  }

  async getMyCompanyRequests(
    userId: string,
    limit: number,
    offset: number
  ): Promise<CompanyRequest[]> {
    const companyRequests = await this.companyRequestModel.findAll({
      where: { user_id: userId },
      limit,
      offset,
    });

    return companyRequests;
  }
}

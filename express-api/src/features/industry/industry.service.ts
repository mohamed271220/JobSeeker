import Industry from "./industry.model";
import { v4 as uuid } from "uuid";

export class IndustryService {
  constructor(private industryModel: typeof Industry = Industry) {}

  async createIndustry(body: { name: string }): Promise<Industry> {
    return this.industryModel.create({
      id: uuid(),
      name: body.name,
    });
  }

  async updateIndustry(
    industryId: string,
    body: { name: string }
  ): Promise<[number]> {
    return this.industryModel.update(body, { where: { id: industryId } });
  }

  async deleteIndustry(
    industryId: string
  ): Promise<number> {
    return this.industryModel.destroy({ where: { id: industryId } });
  }

  async getIndustries(
    includeJobPosts = false
  ): Promise<Industry[]> {
    return this.industryModel.findAll();
  }

  async getIndustry(
    industryId: string,
  ): Promise<Industry | null> {
    return this.industryModel.findByPk(industryId);
  }

}

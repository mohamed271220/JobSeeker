import Company from "../../company/models/company.model";
import Representative from "../../company/models/representative.model";
import { CustomError } from "../../../utils/CustomError";

export const isRepresentative = async (userId: string, companyId: string) => {
  const representative = await Representative.findOne({
    where: {
      user_id: userId,
      company_id: companyId,
    },
  });

  const owner = await Company.findOne({
    where: {
      owner_id: userId,
      id: companyId,
    },
  });

  if (!representative && !owner) {
    throw new CustomError("Unauthorized", 401);
  }

  return representative;
};

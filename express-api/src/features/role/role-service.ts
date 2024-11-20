import Role from "./role.model";
import { v4 as uuid } from "uuid";
import { getPagination } from "../../utils/pagination";
import UserRole from "../auth/models/user-role.model";

export class RoleService {
  constructor(
    private roleRepository: typeof Role = Role,
    private userRoleRepository: typeof UserRole = UserRole
  ) {}

  async createRole(data: { name: string }) {
    return this.roleRepository.create({ id: uuid(), name: data.name });
  }

  async getRoles(limit: number, offset: number, querySearch: string) {
    const whereClause = querySearch
      ? { name: { $iLike: `%${querySearch}%` } }
      : {};
    const { count, rows: roles } = await this.roleRepository.findAndCountAll({
      limit,
      offset,
      where: whereClause,
    });
    const pagination = getPagination(count, limit, offset);
    return { roles, pagination };
  }

  async getRole(id: string) {
    return this.roleRepository.findByPk(id);
  }

  async updateUserRoles(userId: string, roles: string[]) {
    await this.userRoleRepository.destroy({ where: { user_id: userId } });
    const userRoles = roles.map((roleId) => ({
      id: uuid(),
      user_id: userId,
      role_id: roleId,
    }));
    return this.userRoleRepository.bulkCreate(userRoles);
  }

  async updateRole(id: string, data: { name: string }) {
    return this.roleRepository.update({ name: data.name }, { where: { id } });
  }

  async deleteRole(id: string) {
    return this.roleRepository.destroy({ where: { id } });
  }
}

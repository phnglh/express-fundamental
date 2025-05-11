import AppDataSource from "@/config/database";
import { RoleName } from "@/contants/role-name";
import { Role } from "@/entities/role.entity";

export const seedRoles = async () => {
  const roleRepository = AppDataSource.getRepository(Role);

  const roles = await roleRepository.find();
  if (roles.length > 0) {
    console.log("Roles already seeded");
    return;
  }

  const defaultRoles = Object.values(RoleName).map((name) =>
    roleRepository.create({ name }),
  );

  await roleRepository.save(defaultRoles);

  console.log("Seeded roles successfully");
};

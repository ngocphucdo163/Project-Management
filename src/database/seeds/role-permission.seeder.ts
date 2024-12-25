import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { Role } from 'src/module/role/entities/role.entity';
import { DataSource } from 'typeorm';
import { Permission } from './../../module/permission/entities/permission.entity';
import { UserRole } from 'src/module/auth/enum';

@Injectable()
export class RolePermissionSeeder implements Seeder {
  constructor(private readonly connection: DataSource) {}

  async seed() {
    const roleRepository = this.connection.getRepository(Role);
    const permissionRepository = this.connection.getRepository(Permission);

    // Fetch existing roles and permissions
    const roles = await roleRepository.find();
    const permissions = await permissionRepository.find();

    // Admin - manager - contributor
    const managerPermissionNames = [
      'manage_projects',
      'create_tasks',
      'assign_tasks',
      'update_tasks',
    ];

    const contributorPermissionNames = [
      'view_projects',
      'view_tasks',
      'create_tasks',
      'assign_tasks',
      'update_tasks',
    ];

    // From permissions name to permissions
    const managerPermissions = permissions.filter((p) =>
      managerPermissionNames.includes(p.name)
    );
    const contributorPermissions = permissions.filter((p) =>
      contributorPermissionNames.includes(p.name)
    );

    for (const role of roles) {
      if (role.name === UserRole.ADMIN) {
        role.permissions = permissions;
      }
      if (role.name === UserRole.MANAGER) {
        role.permissions = managerPermissions;
      }
      if (role.name === UserRole.CONTRIBUTOR) {
        role.permissions = contributorPermissions;
      }
      await roleRepository.save(role);
    }
  }

  async drop() {}
}

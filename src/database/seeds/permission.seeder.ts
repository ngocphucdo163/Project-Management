import { Injectable } from '@nestjs/common';
import { Permission } from './../../module/permission/entities/permission.entity';
import { Seeder } from 'nestjs-seeder';
import { DataSource } from 'typeorm';

@Injectable()
export class PermissionSeeder implements Seeder {
  constructor(private readonly connection: DataSource) {}

  async seed() {
    const permissions = [
      { name: 'manage_users' },
      { name: 'manage_projects' },
      { name: 'assign_roles' },
      { name: 'create_tasks' },
      { name: 'view_tasks' },
      { name: 'assign_tasks' },
      { name: 'update_tasks' },
    ];

    const permissionRepository = this.connection.getRepository(Permission);

    for (const permission of permissions) {
      const exists = await permissionRepository.findOne({
        where: { name: permission.name },
      });
      if (!exists) {
        await permissionRepository.save(permission);
      }
    }
  }

  async drop() {}
}

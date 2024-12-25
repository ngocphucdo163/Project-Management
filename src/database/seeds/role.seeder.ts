import { Injectable } from '@nestjs/common';
import { Role } from 'src/module/role/entities/role.entity';
import { Seeder } from 'nestjs-seeder';
import { DataSource } from 'typeorm';

@Injectable()
export class RoleSeeder implements Seeder {
  constructor(private readonly connection: DataSource) {}

  async seed() {
    const roles = [
      { name: 'admin' },
      { name: 'manager' },
      { name: 'contributor' },
    ];
    const roleRepository = this.connection.getRepository(Role);
    for (const role of roles) {
      const exists = await roleRepository.findOne({
        where: { name: role.name },
      });
      if (!exists) {
        await roleRepository.save(role);
      }
    }
  }

  async drop() {}
}

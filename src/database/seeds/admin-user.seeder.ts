import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { UserRole } from 'src/module/auth/enum';
import { Role } from 'src/module/role/entities/role.entity';
import { User } from 'src/module/user/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AdminUserSeeder implements Seeder {
  constructor(private readonly connection: DataSource) {}

  async seed(): Promise<any> {
    const userRepository = this.connection.getRepository(User);
    const roleRepository = this.connection.getRepository(Role);
    const adminRole = await roleRepository.findOne({
      where: { name: UserRole.ADMIN },
    });

    const user = new User();
    user.email = 'admin@example.com';
    user.username = 'admin';
    user.password = 'password';
    user.role = adminRole.id as any;
    user.projects = [];
    user.tasks = [];
    await userRepository.save(user);
  }

  async drop() {}
}

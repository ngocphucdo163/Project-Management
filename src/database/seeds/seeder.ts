import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { ormConfig } from 'src/config/orm.config';
import { Permission } from 'src/module/permission/entities/permission.entity';
import { Role } from 'src/module/role/entities/role.entity';
import { PermissionSeeder } from './permission.seeder';
import { RoleSeeder } from './role.seeder';
import { RolePermissionSeeder } from './role-permission.seeder';
import { AdminUserSeeder } from './admin-user.seeder';
import { User } from 'src/module/user/entities/user.entity';

seeder({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([Role, Permission, User]),
  ],
}).run([RoleSeeder, PermissionSeeder, RolePermissionSeeder, AdminUserSeeder]);

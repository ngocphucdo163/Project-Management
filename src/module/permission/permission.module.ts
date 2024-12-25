import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionsService } from './permission.service';
import { PermissionSeeder } from 'src/database/seeds/permission.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionsService, PermissionSeeder],
  exports: [PermissionsService],
})
export class PermissionModule {}

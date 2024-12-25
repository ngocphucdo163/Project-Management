import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>
  ) {}

  async createPermission(name: string): Promise<Permission> {
    const permission = this.permissionsRepository.create({ name });
    return this.permissionsRepository.save(permission);
  }

  async setupDefaultPermissions() {
    await this.createPermission('view_projects');
    await this.createPermission('edit_projects');
    await this.createPermission('delete_projects');
    await this.createPermission('assign_tasks');
    await this.createPermission('complete_tasks');
  }
}

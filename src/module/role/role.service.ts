import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { UserRole } from '../auth/enum';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  ) {}

  async createRole(name: string): Promise<Role> {
    const role = this.rolesRepository.create({ name });
    return this.rolesRepository.save(role);
  }

  getDefaultRole() {
    return this.rolesRepository.findOne({
      where: { name: UserRole.CONTRIBUTOR },
    });
  }

  getRoleInfoByRoleName(name: UserRole) {
    return this.rolesRepository.findOne({
      where: { name },
    });
  }
}

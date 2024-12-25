import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dtos/register.dto';
import { UserRepository } from './repositories/user.repository';
import { RolesService } from '../role/role.service';
import { AssignRoleDto } from './dtos/assign-role.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rolesService: RolesService
  ) {}

  async create(registerDto: RegisterDto) {
    // Find default role id to assign to user
    const contributorRole = await this.rolesService.getDefaultRole();
    const { email, username, password } = registerDto;
    return this.userRepository.createUser({
      email,
      username,
      password,
      role: contributorRole,
    });
  }

  findAllUser() {
    return this.userRepository.find();
  }

  findByEmail(email: string) {
    return this.userRepository.findOneByCondition({ email });
  }

  async findOne(id: string) {
    const result = await this.userRepository.findOneByCondition({ id });
    return result;
  }

  async assignRole(id: string, assignRoleDto: AssignRoleDto) {
    // verify id
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException('User id is not valid');
    }
    const { role } = assignRoleDto;

    // verify role
    const roleExist = await this.rolesService.getRoleInfoByRoleName(role);
    if (!roleExist) {
      throw new BadRequestException('Role does not exist');
    }

    await this.userRepository.update(id, {
      role: roleExist,
    });

    return this.findOne(id);
  }

  updateUser(id: string, payload) {
    return this.userRepository.update(id, payload);
  }
}

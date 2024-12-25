import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RbacGuard } from '../auth/guards/rbac.guard';
import { UserPermission } from '../auth/enum';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { AssignRoleDto } from './dtos/assign-role.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RbacGuard)
  @Permissions(UserPermission.MANAGE_USERS)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all users.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  @UseGuards(RbacGuard)
  @Permissions(UserPermission.MANAGE_USERS)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // Assign role
  @Patch(':id/role')
  @UseGuards(RbacGuard)
  @Permissions(UserPermission.MANAGE_USERS)
  @ApiOperation({ summary: 'Assign role to user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully assigned role to user.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  assignRole(@Param('id') id: string, @Body() assignRoleDto: AssignRoleDto) {
    return this.userService.assignRole(id, assignRoleDto);
  }
}

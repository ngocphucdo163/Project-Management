import { IsEnum } from 'class-validator';
import { UserRole } from 'src/module/auth/enum';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
  @ApiProperty({ description: 'Role to be assigned to the user' })
  @IsEnum(UserRole)
  role: UserRole;
}

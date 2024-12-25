import { IsOptional, IsString } from 'class-validator';
import { CreateProjectDto } from './create-project.dto';
import { User } from 'src/module/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto extends CreateProjectDto {
  @ApiProperty({ description: 'The name of the project', required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'List of users involved in the project',
    required: false,
    type: [User],
  })
  @IsOptional()
  members: User[];
}

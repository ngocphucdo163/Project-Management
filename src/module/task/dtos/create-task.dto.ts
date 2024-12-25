import { IsOptional, IsString } from 'class-validator';
import { Project } from 'src/module/project/entities/project.entity';
import { User } from 'src/module/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Title of the task' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the task', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Associated project for the task' })
  @IsString()
  project: Project;

  @ApiProperty({
    description: 'List of users assigned to the task',
    type: [User],
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  assignees: User[];
}

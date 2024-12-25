import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../entities/task.entity';
import { IsEnum, IsOptional } from 'class-validator';
import { Project } from 'src/module/project/entities/project.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends CreateTaskDto {
  @ApiProperty({ description: 'Status of the task', required: false })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    description: 'Associated project for the task',
    required: false,
  })
  @IsOptional()
  project: Project;
}

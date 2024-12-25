import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskStatus } from './entities/task.entity';
import { UserPermission } from '../auth/enum';
import { RbacGuard } from '../auth/guards/rbac.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('/tasks')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Post()
  @UseGuards(RbacGuard)
  @Permissions(UserPermission.CREATE_TASKS)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  @UseGuards(RbacGuard)
  @Permissions(UserPermission.VIEW_TASKS)
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  findAll(@Query() query: { status: TaskStatus }) {
    return this.tasksService.findAll(query);
  }

  @Get(':id')
  @UseGuards(RbacGuard)
  @Permissions(UserPermission.VIEW_TASKS)
  @ApiResponse({ status: 200, description: 'Task retrieved successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RbacGuard)
  @Permissions(UserPermission.UPDATE_TASKS)
  @ApiResponse({ status: 200, description: 'Task updated successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(RbacGuard)
  @Permissions(UserPermission.UPDATE_TASKS)
  @ApiResponse({ status: 200, description: 'Task deleted successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  delete(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}

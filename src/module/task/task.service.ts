import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskRepository } from './repositories/task.repository';
import { ProjectRepository } from '../project/repositories/project.repository';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly tasksRepository: TaskRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly userRepository: UserRepository
  ) {}

  findAll(filter) {
    const { status } = filter;
    return this.tasksRepository.findAllTask(status);
  }

  findOne(id: string) {
    return this.tasksRepository.findOneByCondition({ id });
  }

  async createTask(createTaskDto: CreateTaskDto) {
    // Verify title
    const titleExist = await this.tasksRepository.findOneByCondition({
      title: createTaskDto.title,
    });

    if (titleExist) {
      throw new BadRequestException('Task title already exists');
    }

    // Verify projectId
    const projectExist = await this.projectRepository.findOneByCondition({
      id: createTaskDto.project,
    });
    if (!projectExist) {
      throw new BadRequestException('Project does not exist');
    }

    // Verify members
    let membersExist;
    if (createTaskDto.assignees && createTaskDto.assignees.length > 0) {
      membersExist = await this.userRepository.findByIds(
        createTaskDto.assignees
      );
      if (membersExist.length !== createTaskDto.assignees.length) {
        throw new BadRequestException('Members do not exist');
      }
    }

    const task = await this.tasksRepository.createTask(createTaskDto);
    const result = await this.tasksRepository.assignUserToTask(
      task.id,
      membersExist
    );

    return result;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    // Verify id
    const taskInfo = await this.findOne(id);
    if (!taskInfo) {
      throw new BadRequestException('Task id is not valid');
    }

    // Verify title
    if (updateTaskDto.title) {
      const taskTitleExist = await this.tasksRepository.findOneByCondition({
        title: updateTaskDto.title,
      });
      if (taskTitleExist && taskTitleExist.id !== id) {
        throw new BadRequestException('Task title already exists');
      }
    }

    // Verify projectId
    if (updateTaskDto.project) {
      const projectExist = await this.projectRepository.findOneByCondition({
        id: updateTaskDto.project,
      });
      if (!projectExist) {
        throw new BadRequestException('Project does not exist');
      }
    }

    // Verify assignees
    const isAssigneesChanged =
      JSON.stringify(taskInfo.assignees.map((a) => a.id)) !==
      JSON.stringify(updateTaskDto.assignees);
    if (
      updateTaskDto.assignees &&
      updateTaskDto.assignees.length > 0 &&
      isAssigneesChanged
    ) {
      const membersExist = await this.userRepository.findByIds(
        updateTaskDto.assignees
      );
      if (membersExist.length !== updateTaskDto.assignees.length) {
        throw new BadRequestException('Members do not exist');
      }

      await this.tasksRepository.assignUserToTask(id, membersExist);
    }

    return this.tasksRepository.updateTask(id, updateTaskDto);
  }

  deleteTask(id: string) {
    return this.tasksRepository.deleteTask(id);
  }
}

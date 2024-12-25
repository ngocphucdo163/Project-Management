import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { User } from 'src/module/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Task, TaskStatus } from '../entities/task.entity';

@Injectable()
export class TaskRepository extends BaseRepository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource);
  }

  async createTask(data: Partial<Task>): Promise<Task> {
    const tasks = this.create(data);
    return await this.save(tasks);
  }

  async assignUserToTask(id: string, assignees: User[]) {
    if (assignees && assignees.length > 0) {
      const assigneeIds = assignees.map((assignee) => assignee.id);
      await this.query(
        `DELETE FROM "task_assignees_users" WHERE "tasksId" = $1`,
        [id]
      );

      await this.query(
        `INSERT INTO "task_assignees_users" ("usersId", "tasksId")
         SELECT unnest($1::uuid[]), $2`,
        [assigneeIds, id]
      );
    }

    return this.findOneByCondition({ id });
  }

  findAllTask(status?: TaskStatus) {
    return this.find({
      where: { status },
    });
  }

  async findOneByCondition(
    condition: any,
    select?: string[]
  ): Promise<Task | undefined> {
    return this.findOneByConditionBase(condition, ['assignees', 'project']);
  }

  async updateTask(id: string, data: Partial<Task>) {
    const { title, description, status } = data;

    await this.update({ id }, { title, description, status });
    return this.findOneByCondition({ id });
  }

  deleteTask(id: string) {
    return this.delete({ id });
  }
}

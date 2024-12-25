import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { User } from 'src/module/user/entities/user.entity';
import { UserRepository } from 'src/module/user/repositories/user.repository';
import { DataSource } from 'typeorm';
import { Project } from '../entities/project.entity';

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userRepository: UserRepository
  ) {
    super(Project, dataSource);
  }
  async createProject(data: Partial<Project>): Promise<Project> {
    const project = this.create(data);
    return await this.save(project);
  }

  async assignUserToProject(id: string, users: User[]) {
    const usersInfo = await this.userRepository.findByIds(users);

    if (usersInfo && usersInfo.length > 0) {
      const userIds = usersInfo.map((user) => user.id);

      await this.query(
        `DELETE FROM "project_members_users" WHERE "projectsId" = $1`,
        [id]
      );

      await this.query(
        `INSERT INTO "project_members_users"("usersId", "projectsId") 
         SELECT unnest($1::uuid[]), $2`,
        [userIds, id]
      );
    }
    return await this.findOneByCondition({ id });
  }

  findAllProject() {
    return this.find();
  }

  async findOneByCondition(
    condition: any,
    select?: string[]
  ): Promise<Project | undefined> {
    return this.findOneByConditionBase(condition, ['members']);
  }

  async updateProject(id: string, data: Partial<Project>) {
    const { name, description } = data;

    await this.update(id, { name, description });
    return this.findOneByCondition({ id });
  }

  deleteProject(id: string) {
    return this.delete(id);
  }
}

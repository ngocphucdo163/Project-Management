import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectRepository } from './repositories/project.repository';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { In } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}
  async createProject(createProjectDto: CreateProjectDto) {
    const projectExist = await this.projectRepository.findOneByCondition({
      name: createProjectDto.name,
    });
    if (projectExist) {
      throw new BadRequestException('Project name already exists');
    }
    const project = await this.projectRepository.createProject(
      createProjectDto
    );

    const result = await this.projectRepository.assignUserToProject(
      project.id,
      createProjectDto.members
    );
    return result;
  }

  findAllProject() {
    return this.projectRepository.findAllProject();
  }

  getProjectById(id: string) {
    return this.projectRepository.findOneByCondition({ id });
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    const projectInfo = await this.projectRepository.findOneByCondition({
      id,
    });
    if (!projectInfo) {
      throw new BadRequestException('Project id is not valid');
    }

    if (updateProjectDto.name) {
      const projectNameExist = await this.projectRepository.findOneByCondition({
        name: updateProjectDto.name,
      });
      if (projectNameExist && projectNameExist.id !== id) {
        throw new BadRequestException('Project name already exists');
      }
    }

    const isMembersChanged =
      JSON.stringify(projectInfo.members.map((m) => m.id)) !==
      JSON.stringify(updateProjectDto.members.map((m) => m.id));
    console.log('===isMembersChanged===', isMembersChanged);
    if (
      updateProjectDto.members &&
      updateProjectDto.members.length > 0 &&
      isMembersChanged
    ) {
      await this.projectRepository.assignUserToProject(
        id,
        updateProjectDto.members
      );
    }

    return this.projectRepository.updateProject(id, updateProjectDto);
  }

  deleteProject(id: string) {
    return this.projectRepository.deleteProject(id);
  }
}

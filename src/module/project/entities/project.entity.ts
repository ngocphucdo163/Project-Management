import { Task } from 'src/module/task/entities/task.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('projects')
export class Project extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Task, (task) => task.project, { cascade: true })
  tasks: Task[];

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({
    name: 'project_members_users',
    joinColumn: {
      name: 'projectsId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'usersId',
      referencedColumnName: 'id',
    },
  })
  members: User[];
}

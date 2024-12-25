import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Role } from 'src/module/role/entities/role.entity';
import { Project } from 'src/module/project/entities/project.entity';
import { Task } from 'src/module/task/entities/task.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToMany(() => Project, (project) => project.members)
  @JoinTable({
    name: 'project_members_users',
  })
  projects: Project[];

  @ManyToMany(() => Task, (task) => task.assignees)
  @JoinTable({
    name: 'task_assignees_users',
  })
  tasks: Task[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

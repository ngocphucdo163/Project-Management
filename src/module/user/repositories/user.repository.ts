import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { User } from '../entities/user.entity';
import { DataSource, In } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource);
  }

  async findOneByCondition(
    condition: any,
    select?: string[]
  ): Promise<User | undefined> {
    return super.findOneByConditionBase(
      condition,
      ['role', 'role.permissions'],
      select
    );
  }

  findByIds(ids: User[]) {
    return this.find({
      where: {
        id: In(ids),
      },
    });
  }

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.create(data);
    return await this.save(user);
  }
}

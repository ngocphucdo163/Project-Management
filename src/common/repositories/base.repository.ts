import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(type: EntityTarget<T>, dataSource: DataSource) {
    super(type, dataSource.createEntityManager());
  }

  async findOneByConditionBase(
    condition: any,
    relations?: string[],
    select?: string[]
  ): Promise<T | undefined> {
    if (!condition) {
      console.error('Condition is undefined or null');
      return undefined;
    }

    return this.findOne({
      where: condition,
      relations,
      select,
    });
  }

  // createData(input: T): Promise<T> {
  //   return this.save(input);
  // }
}

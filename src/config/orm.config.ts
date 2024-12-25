import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { Permission } from 'src/module/permission/entities/permission.entity';
import { Role } from 'src/module/role/entities/role.entity';
const rootDir = path.join(__dirname, '..', '..');
dotenv.config();

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  autoLoadEntities: false,
  entities: [Role, Permission],
  migrations: [rootDir + '/dist/migration/**/*.js'],
} as any;

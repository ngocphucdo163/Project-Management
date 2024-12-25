import { DataSource } from 'typeorm';

console.log('====process.env.DB_DATABASE======', process.env.DB_DATABASE);
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5437', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'Abcd1234!',
  database: process.env.DB_DATABASE || 'p_collaboration',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});

AppDataSource.initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch((err) =>
    console.error('Error during Data Source initialization', err)
  );

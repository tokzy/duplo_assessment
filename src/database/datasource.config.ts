import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import * as fs from 'fs';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrationsRun: true,
  logging: true,
  migrationsTableName: 'migrations',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('./src/database/ca-certificate.crt'),
  },
};

export default new DataSource(dataSourceOptions);

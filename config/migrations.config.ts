import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

const envFilePath: string = 'common/envs/develop.env';
dotenv.config({ path: envFilePath });

const dataSource = new DataSource({
  type: process.env.DATABASE_TYPE as 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? Number(process.env.DATABASE_PORT)
    : undefined,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  logger: 'file',
  extra: {
    max: 10,
  },
});

export default dataSource;

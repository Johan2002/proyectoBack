import { Logger } from '@nestjs/common';
import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';

export const TypeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    const logger: Logger = new Logger('TypeOrmConfig');
    logger.log('Initializing database...');

    return {
      type: process.env.DATABASE_TYPE as 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT
        ? Number(process.env.DATABASE_PORT)
        : undefined,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migration/**/*{.ts,.js}'],
      logger: 'file',
      autoLoadEntities: true,
      // synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
      logging: true,
      extra: {
        max: 10,
      },
    };
  },
};

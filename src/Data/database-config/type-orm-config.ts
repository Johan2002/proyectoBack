import { Logger } from '@nestjs/common';
import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';

export const TypeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    const logger: Logger = new Logger('TypeOrmConfig');
    logger.log('Inicializando base de datos...');

    return {
      type: 'postgres',
      host: '192.168.0.12',
      port: 5432,
      username: 'johan',
      password: '123456789',
      database: 'johan',
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.js'],
      logger: 'file',
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        max: 10,
      },
    };
  },
};

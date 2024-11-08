import { ApiModule } from './API/api.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmConfigAsync } from './Data/database-config/type-orm-config';
import { AllExceptionsFilter } from './Data/interceptor/catch/error-interceptor';
import { ResponseInterceptor } from './Data/interceptor/response/response.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './shared/socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'common/envs/develop.env',
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigAsync),
    ApiModule,
    JwtModule,
    SocketModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}

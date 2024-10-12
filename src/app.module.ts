import { ApiModule } from './API/api.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import { LoggingInterceptor } from './interceptor/typeorm-logging.interceptor';
import { TypeOrmConfigAsync } from './Data/database-config/type-orm-config';

@Module({
  imports: [TypeOrmModule.forRootAsync(TypeOrmConfigAsync), ApiModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },
  ],
})
export class AppModule {}

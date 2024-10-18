import { ApiModule } from './API/api.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmConfigAsync } from './Data/database-config/type-orm-config';
import { AuthGuard } from './Data/guards/auth.guard';


@Module({
  imports: [TypeOrmModule.forRootAsync(TypeOrmConfigAsync), ApiModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

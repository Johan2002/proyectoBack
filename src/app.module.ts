import { ApiModule } from './API/api.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmConfigAsync } from './Data/database-config/type-orm-config';
import { AuthGuard } from './Data/guards/auth.guard';
import { AllExceptionsFilter } from './Data/filters/filter-exceptions.filter';
import { TransformAndExceptionInterceptor } from './Data/interceptor/error-interceptor';

@Module({
  imports: [TypeOrmModule.forRootAsync(TypeOrmConfigAsync), ApiModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformAndExceptionInterceptor,
    },
  ],
})
export class AppModule {}

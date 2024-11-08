import { Module } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { TaxesController } from './taxes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tax } from 'src/Data/entities/taxes-entity/taxes.entity';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Tax])],
  controllers: [TaxesController],
  providers: [TaxesService, DataGateway],
})
export class TaxesModule {}

import { Module } from '@nestjs/common';
import { HeadquarterService } from './headquarter.service';
import { HeadquarterController } from './headquarter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Headquarter } from 'src/Data/entities/headquarter-entity/headquarter.entity';
import { Company } from 'src/Data/entities/company-entity/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Headquarter, Company])],
  controllers: [HeadquarterController],
  providers: [HeadquarterService],
})
export class HeadquarterModule {}

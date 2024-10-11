import { Injectable } from '@nestjs/common';
import { CreateHeadquarterDto } from './dto/create-headquarter.dto';
import { UpdateHeadquarterDto } from './dto/update-headquarter.dto';

@Injectable()
export class HeadquarterService {
  create(createHeadquarterDto: CreateHeadquarterDto) {
    return 'This action adds a new sede';
  }

  findAll() {
    return `This action returns all sede`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sede`;
  }

  update(id: number, updateHeadquarterDto: UpdateHeadquarterDto) {
    return `This action updates a #${id} sede`;
  }

  remove(id: number) {
    return `This action removes a #${id} sede`;
  }
}

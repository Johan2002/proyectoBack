import { Injectable } from '@nestjs/common';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/Data/entities/inventory-entity/inventory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  @InjectRepository(Inventory)
  private readonly inventoryReposiitory: Repository<Inventory>;

  async create() {
    return 'This action adds a new inventory';
  }

  findAll() {
    return `This action returns all inventory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}

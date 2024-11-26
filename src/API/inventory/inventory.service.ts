import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/Data/entities/inventory-entity/inventory.entity';
import {
  ICreateInventory,
  Iinventory,
} from 'src/Data/interfaces/api/inventory-interface/inventory.interface';
import { DataGateway } from 'src/shared/socket/socket.gateway';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  @InjectRepository(Inventory)
  private readonly inventoryRepository: Repository<Inventory>;

  constructor(private readonly dataGateway: DataGateway) {}

  async create({ ...createInventory }: ICreateInventory): Promise<Iinventory> {
    const { inventoryId }: Iinventory = await this.inventoryRepository.save({
      ...createInventory,
    });

    const inventory = await this.inventoryRepository.findOne({
      where: { inventoryId },
    });

    this.dataGateway.emitData({ acction: 'inventory/create', data: inventory });

    return inventory;
  }

  async findAll(): Promise<Array<Iinventory>> {
    return await this.inventoryRepository.find({
      relations: ['employee', 'headquarter', 'inventoryDetail.product'],
    });
  }

  async findOne(inventoryId: string): Promise<Iinventory> {
    const inventory = await this.inventoryRepository.findOne({
      where: { inventoryId },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory not found.');
    }
    return inventory;
  }
}

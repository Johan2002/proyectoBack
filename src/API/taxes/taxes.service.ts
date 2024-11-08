import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tax } from 'src/Data/entities/taxes-entity/taxes.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  ICreateTax,
  ITax,
  IUpdateTax,
} from 'src/Data/interfaces/api/taxes-interface/taxes.interface';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Injectable()
export class TaxesService {
  @InjectRepository(Tax)
  private readonly taxRepository: Repository<Tax>;

  constructor(private readonly dataGateway: DataGateway) {}

  async create({ ...createTax }: ICreateTax): Promise<ITax> {
    const { taxId }: ITax = await this.taxRepository.save({
      ...createTax,
    });

    const tax = await this.taxRepository.findOne({
      where: { taxId },
    });

    this.dataGateway.emitData({ acction: 'tax/create', data: tax });

    return tax;
  }

  async findAll(): Promise<Array<ITax>> {
    return await this.taxRepository.find();
  }

  async findOne(taxId: string): Promise<ITax> {
    const tax = await this.taxRepository.findOne({
      where: { taxId },
    });

    if (!tax) {
      throw new NotFoundException('Tax not found');
    }

    return tax;
  }

  async update(taxId: string, updateTax: IUpdateTax): Promise<ITax> {
    const updateResult: UpdateResult = await this.taxRepository.update(taxId, {
      ...updateTax,
    });

    if (!updateResult.affected)
      throw new NotFoundException('Tax information could not be updated.');

    const tax: ITax = await this.taxRepository.findOne({
      where: { taxId },
    });

    this.dataGateway.emitData({ acction: 'tax/update', data: tax });

    return tax;
  }

  async remove(taxId: string): Promise<string> {
    const deleteResult: DeleteResult = await this.taxRepository.delete(taxId);

    if (!deleteResult) throw new NotFoundException('Tax not found.');

    this.dataGateway.emitData({ acction: 'tax/delete', data: { taxId } });

    return taxId;
  }
}

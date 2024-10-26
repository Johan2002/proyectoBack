import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tax } from 'src/Data/entities/taxes-entity/taxes.entity';
import { Repository } from 'typeorm';
import {
  ICreateTax,
  ITax,
} from 'src/Data/interfaces/api/taxes-interface/taxes.interface';

@Injectable()
export class TaxesService {
  constructor(
    @InjectRepository(Tax)
    private readonly taxRepository: Repository<Tax>,
  ) {}
  async create({ ...createTax }: ICreateTax): Promise<ITax> {
    const { taxId }: ITax = await this.taxRepository.save({
      ...createTax,
    });

    const tax = await this.taxRepository.findOne({
      where: { taxId },
    });
    return tax;
  }

  async findAll(): Promise<Array<ITax>> {
    return await this.taxRepository.find();
  }

  async findOne(id: string): Promise<ITax> {
    const tax = await this.taxRepository.findOne({
      where: { taxId: id },
      relations: ['product'],
    });
    if (!tax) {
      throw new BadRequestException('Tax not found');
    }
    return tax;
  }

  async update(id: string, updateTaxDto: UpdateTaxDto): Promise<ITax> {
    const tax = await this.taxRepository.findOne({
      where: { taxId: id },
      relations: ['product'],
    });
    if (!tax) {
      throw new BadRequestException('Tax not found');
    }
    Object.assign(tax, updateTaxDto);
    return tax;
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.taxRepository.delete(id);
  }
}

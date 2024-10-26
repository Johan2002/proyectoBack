import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/Data/entities/supplier-entity/supplier.entity';
import { Repository } from 'typeorm';
import {
  ICreateSupplier,
  ISupplier,
} from 'src/Data/interfaces/api/supplier-interface/supplier.interface';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}
  async create({
    companyId,
    ...createSupplier
  }: ICreateSupplier): Promise<ISupplier> {
    const { supplierId }: ISupplier = await this.supplierRepository.save({
      company: [{ companyId }],
      ...createSupplier,
    });

    const supplier = await this.supplierRepository.findOne({
      where: { supplierId },
    });

    return supplier;
  }

  async findAll(): Promise<Array<ISupplier>> {
    return await this.supplierRepository.find({
      relations: ['company', 'products'],
    });
  }

  async findOne(id: string): Promise<ISupplier> {
    const supplier = await this.supplierRepository.findOne({
      where: { supplierId: id },
      relations: ['company', 'products'],
    });
    if (!supplier) {
      throw new BadRequestException('Supplier not found.');
    }
    return supplier;
  }

  async update(
    id: string,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<ISupplier> {
    const supplier = await this.supplierRepository.findOne({
      where: { supplierId: id },
    });
    if (!supplier) {
      throw new BadRequestException('Supplier not found.');
    }

    Object.assign(supplier, updateSupplierDto);

    return this.supplierRepository.save(supplier);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.supplierRepository.delete(id);
  }
}

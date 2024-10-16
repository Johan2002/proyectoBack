import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/Data/entities/supplier-entity/supplier.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/Data/entities/company-entity/company.entity';
import { ISupplier } from 'src/Data/interfaces/api/supplier-interface/supplier.interface';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  async create(createSupplierDto: CreateSupplierDto): Promise<ISupplier> {
    const { company: companyId, ...supplierData } = createSupplierDto;

    let company = null;

    if (companyId) {
      company = await this.companyRepository.findOne({
        where: { companyId },
      });
      if (!company) {
        throw new NotFoundException('The company is not in the system.');
      }
    }

    const newSupplier = this.supplierRepository.create({
      company,
      ...supplierData,
    });
    return this.supplierRepository.save(newSupplier);
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
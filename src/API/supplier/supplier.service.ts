import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/Data/entities/supplier-entity/supplier.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/Data/entities/company-entity/company.entity';
import { ISupplier } from 'src/Data/interfaces/supplier-interface/supplier.interface';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  async create(createSupplierDto: CreateSupplierDto): Promise<ISupplier> {
    const logger: Logger = new Logger('TypeOrmConfig');
    logger.log('Creando proveedor en base de datos....');
    const { company: companyId, ...supplierData } = createSupplierDto;

      let company = null;

      if (companyId) {
        company = await this.companyRepository.findOne({
          where: { companyId },
        });
        if (!company) {
          throw new NotFoundException(
            'La empresa no se encuentra en el sistema',
          );
        }
      }

      const newSupplier = await this.supplierRepository.create({
        company,
        ...supplierData,
      });
      return this.supplierRepository.save(newSupplier);
  }

  async findAll(): Promise<Array<ISupplier>> {
    const logger: Logger = new Logger('TypeOrmConfig');
    logger.log('Buscando proveedores en base de datos....');
    logger.log('Proveedores encontrados en base de datos....');
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
      throw new BadRequestException('Proveedor no encontrado.');
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
      throw new BadRequestException('Proveedor no encontrado.');
    }

    Object.assign(supplier, updateSupplierDto);

    return this.supplierRepository.save(supplier);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.supplierRepository.delete(id);
  }
}

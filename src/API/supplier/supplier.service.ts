import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/Data/entities/supplier-entity/supplier.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  ICreateSupplier,
  ISupplier,
  IUpdateSupplier,
} from 'src/Data/interfaces/api/supplier-interface/supplier.interface';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Injectable()
export class SupplierService {
  @InjectRepository(Supplier)
  private readonly supplierRepository: Repository<Supplier>;

  constructor(private readonly dataGateway: DataGateway) {}

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

    this.dataGateway.emitData({ acction: 'supplier/create', data: supplier });

    return supplier;
  }

  async findAll(): Promise<Array<ISupplier>> {
    return await this.supplierRepository.find({});
  }

  async findOne(supplierId: string): Promise<ISupplier> {
    const supplier = await this.supplierRepository.findOne({
      where: { supplierId },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found.');
    }

    return supplier;
  }

  async update(
    supplierId: string,
    updateSupplier: IUpdateSupplier,
  ): Promise<ISupplier> {
    const updateResult: UpdateResult = await this.supplierRepository.update(
      supplierId,
      { ...updateSupplier },
    );

    if (!updateResult.affected)
      throw new NotFoundException('Supplier information could not be updated.');

    const supplier = await this.supplierRepository.findOne({
      where: { supplierId },
    });

    this.dataGateway.emitData({ acction: 'supplier/update', data: supplier });

    return supplier;
  }

  async remove(supplierId: string): Promise<string> {
    const deleteResult: DeleteResult =
      await this.supplierRepository.delete(supplierId);

    if (!deleteResult.affected)
      throw new NotFoundException('Supplier not found.');

    this.dataGateway.emitData({
      acction: 'supplier/delete',
      data: { supplierId },
    });

    return supplierId;
  }
}

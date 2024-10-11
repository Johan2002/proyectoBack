import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SupplierService {
  create(createSupplierDto: CreateSupplierDto) {
    return 'This action adds a new proveedor';
  }

  findAll() {
    return `This action returns all proveedor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proveedor`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} proveedor`;
  }

  remove(id: number) {
    return `This action removes a #${id} proveedor`;
  }
}

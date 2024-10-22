import { Injectable } from '@nestjs/common';
import { UpdateSaleDetailDto } from './dto/update-sale-detail.dto';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';
import {
  ICreateSaleDetail,
  ISaleDetail,
} from 'src/Data/interfaces/api/sale-detail-interface/sale-detail.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleDetail } from 'src/Data/entities/sale-details-entity/sale-details.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleDetailsService {
  constructor(
    @InjectRepository(SaleDetail)
    private readonly detailRepository: Repository<SaleDetail>,
  ) {}
  async create({
    saleId,
    product,
    ...createDetail
  }: ICreateSaleDetail): Promise<ISaleDetail> {
    const { saleDetailId }: ISaleDetail = await this.detailRepository.save({
      sale: { saleId },
      product,
      ...createDetail,
    });

    const saleDetail = await this.detailRepository.findOne({
      where: { saleDetailId },
    });
    return saleDetail;
  }

  findAll() {
    return `This action returns all saleDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saleDetail`;
  }

  update(id: number, updateSaleDetailDto: UpdateSaleDetailDto) {
    return `This action updates a #${id} saleDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleDetail`;
  }
}

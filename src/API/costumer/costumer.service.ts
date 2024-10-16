import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Costumer } from 'src/Data/entities/costumer-entity/costumer.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/Data/entities/company-entity/company.entity';
import { ICostumer } from 'src/Data/interfaces/api/costumer-interface/costumer.interface';

@Injectable()
export class CostumerService {
  constructor(
    @InjectRepository(Costumer)
    private readonly costumerRepository: Repository<Costumer>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  async create(createCostumerDto: CreateCostumerDto): Promise<ICostumer> {
    const { company: companyId, ...costumerData } = createCostumerDto;
    let company = null;

    if (companyId) {
      company = await this.companyRepository.findOne({
        where: { companyId },
      });
      if (!company) {
        throw new NotFoundException('The company is not in the system.');
      }
    }

    const newCostumer = this.costumerRepository.create({
      company,
      ...costumerData,
    });
    return this.costumerRepository.save(newCostumer);
  }

  async findAll(): Promise<Array<ICostumer>> {
    return await this.costumerRepository.find({
      relations: ['company', 'sales'],
    });
  }

  async findOne(id: string): Promise<ICostumer> {
    const costumer = await this.costumerRepository.findOne({
      where: { costumerId: id },
      relations: ['company', 'sales'],
    });
    if (!costumer) {
      throw new BadRequestException('Customer not found.');
    }
    return costumer;
  }

  async update(
    id: string,
    updateCostumerDto: UpdateCostumerDto,
  ): Promise<ICostumer> {
    const costumer = await this.costumerRepository.findOne({
      where: { costumerId: id },
    });
    if (!costumer) {
      throw new BadRequestException('Customer not found.');
    }

    Object.assign(costumer, updateCostumerDto);

    return this.costumerRepository.save(costumer);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.costumerRepository.delete(id);
  }
}

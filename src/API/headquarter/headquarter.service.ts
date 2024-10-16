import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateHeadquarterDto } from './dto/create-headquarter.dto';
import { UpdateHeadquarterDto } from './dto/update-headquarter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Headquarter } from 'src/Data/entities/headquarter-entity/headquarter.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/Data/entities/company-entity/company.entity';
import { IHeadquarter } from 'src/Data/interfaces/api/headquarter-interface/headquarter.interface';

@Injectable()
export class HeadquarterService {
  constructor(
    @InjectRepository(Headquarter)
    private readonly headquarterRepository: Repository<Headquarter>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  async create(
    createHeadquarterDto: CreateHeadquarterDto,
  ): Promise<IHeadquarter> {
    const { company: companyId, ...headquarterData } = createHeadquarterDto;
    const company = await this.companyRepository.findOne({
      where: { companyId },
    });
    if (!company) {
      throw new NotFoundException('The company is not in the system.');
    }

    const newHeadquarter = this.headquarterRepository.create({
      company,
      ...headquarterData,
    });
    return this.headquarterRepository.save(newHeadquarter);
  }

  async findAll(): Promise<Array<IHeadquarter>> {
    return await this.headquarterRepository.find({
      relations: ['employees', 'company'],
    });
  }

  async findOne(id: string): Promise<IHeadquarter> {
    const headquarter = await this.headquarterRepository.findOne({
      where: { headquarterId: id },
      relations: ['company', 'sales'],
    });
    if (!headquarter) {
      throw new BadRequestException('Headquarter not found.');
    }
    return headquarter;
  }

  async update(
    id: string,
    updateHeadquarterDto: UpdateHeadquarterDto,
  ): Promise<IHeadquarter> {
    const headquarter = await this.headquarterRepository.findOne({
      where: { headquarterId: id },
    });
    if (!headquarter) {
      throw new BadRequestException('Headquarter not found.');
    }

    Object.assign(headquarter, updateHeadquarterDto);

    return this.headquarterRepository.save(headquarter);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.headquarterRepository.delete(id);
  }
}

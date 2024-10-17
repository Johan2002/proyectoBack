import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateHeadquarterDto } from './dto/update-headquarter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Headquarter } from 'src/Data/entities/headquarter-entity/headquarter.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/Data/entities/company-entity/company.entity';
import {
  ICreateHeadquarter,
  IHeadquarter,
} from 'src/Data/interfaces/api/headquarter-interface/headquarter.interface';

@Injectable()
export class HeadquarterService {
  constructor(
    @InjectRepository(Headquarter)
    private readonly headquarterRepository: Repository<Headquarter>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  async create({
    companyId,
    ...createHeadquarter
  }: ICreateHeadquarter): Promise<IHeadquarter> {

    const { headquarterId }: IHeadquarter =
      await this.headquarterRepository.save({
        company: {companyId},
        ...createHeadquarter,
      });

    const headquarter = await this.headquarterRepository.findOne({
      where: { headquarterId },
    });

    return headquarter;
  }

  async findAll(): Promise<Array<IHeadquarter>> {
    return await this.headquarterRepository.find({
      relations: ['employees', 'company'],
    });
  }

  async findOne(id: string): Promise<IHeadquarter> {
    const headquarter = await this.headquarterRepository.findOne({
      where: { headquarterId: id },
      relations: ['employees', 'company'],
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

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
import { IHeadquarter } from 'src/Data/interfaces/headquarter-interface/headquarter.interface';

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
    const logger: Logger = new Logger('TypeOrmConfig');
    logger.log('Creando sede en base de datos....');
    const { company: companyId, ...headquarterData } = createHeadquarterDto;
    const company = await this.companyRepository.findOne({
      where: { companyId },
    });
    if (!company) {
      throw new NotFoundException('La empresa no se encuentra en el sistema');
    }

    const newHeadquarter = await this.headquarterRepository.create({
      company,
      ...headquarterData,
    });
    return this.headquarterRepository.save(newHeadquarter);
  }

  async findAll(): Promise<Array<IHeadquarter>> {
    const logger: Logger = new Logger('TypeOrmConfig');
    logger.log('Buscando sedes en base de datos....');
    logger.log('Sedes encontrados en base de datos....');
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
      throw new BadRequestException('Sede no encontrado.');
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
      throw new BadRequestException('Sede no encontrado.');
    }

    Object.assign(headquarter, updateHeadquarterDto);

    return this.headquarterRepository.save(headquarter);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.headquarterRepository.delete(id);
  }
}

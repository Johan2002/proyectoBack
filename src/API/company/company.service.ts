import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICompany } from 'src/Data/interfaces/company-interface/company.interface';
import { Company } from 'src/Data/entities/company-entity/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<ICompany> {
    const logger: Logger = new Logger('TypeOrmConfig');
    logger.log('Creando empresa en base de datos....');
    const {
      headquarters: headquarterId,
      suppliers: supplierId,
      costumers: costumerId,
      ...companyData
    } = createCompanyDto;

    try {

      const newCompany = this.companyRepository.create({
        ...companyData,
      });

      // if (
      //   createCompanyDto.nit &&
      //   createCompanyDto.name &&
      //   createCompanyDto.email &&
      //   createCompanyDto.phone
      // ) {
      //   throw new NotFoundException(
      //     'El nit, nombre, email o telefono ya están registrados en el sistema',
      //   );
      // }

      return this.companyRepository.save(newCompany);
    } catch (error) {
      logger.error('Error al crear la empresa en la base de datos', error);

      throw new NotFoundException(
        'Error al crear la empresa: ' + error.message,
      );
    }
  }

  async findAll(): Promise<Array<ICompany>> {
    const logger: Logger = new Logger('TypeOrmConfig');
    logger.log('Buscando empresa en base de datos....');
    logger.log('Empresa encontrada en base de datos....');
    return await this.companyRepository.find({
      relations: ['headquarters', 'suppliers', 'costumers'],
    });
  }

  async findOne(id: string): Promise<ICompany> {
    const company = await this.companyRepository.findOne({
      where: { companyId: id },
      relations: ['headquarters', 'suppliers', 'costumers'],
    });
    if (!company) {
      throw new BadRequestException('Company not found');
    }
    return company;
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<ICompany> {
    const company = await this.companyRepository.findOne({
      where: { companyId: id },
    });
    if (!company) {
      throw new BadRequestException('Company not found');
    }

    Object.assign(company, updateCompanyDto);

    return this.companyRepository.save(company);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.companyRepository.delete(id);
  }
}

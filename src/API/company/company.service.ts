import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ICompany,
  ICreateCompany,
} from 'src/Data/interfaces/api/company-interface/company.interface';
import { Company } from 'src/Data/entities/company-entity/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create({ ...createCompany }: ICreateCompany): Promise<ICompany> {
    const { companyId }: ICompany = await this.companyRepository.save({
      ...createCompany,
    });

    const company = await this.companyRepository.findOne({
      where: { companyId },
    });

    return company;
  }

  async findAll(): Promise<Array<ICompany>> {
    return await this.companyRepository.find();
  }

  async findOne(id: string): Promise<ICompany> {
    const company = await this.companyRepository.findOne({
      where: { companyId: id },
      relations: ['headquarters', 'suppliers', 'customers'],
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

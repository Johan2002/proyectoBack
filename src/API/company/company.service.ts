import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  ICompany,
  ICreateCompany,
  IUpdateCompany,
} from 'src/Data/interfaces/api/company-interface/company.interface';
import { Company } from 'src/Data/entities/company-entity/company.entity';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Injectable()
export class CompanyService {
  @InjectRepository(Company)
  private readonly companyRepository: Repository<Company>;

  constructor(private readonly dataGateway: DataGateway) {}

  async create({ ...createCompany }: ICreateCompany): Promise<ICompany> {
    const { companyId }: ICompany = await this.companyRepository.save({
      ...createCompany,
    });

    const company = await this.companyRepository.findOne({
      where: { companyId },
    });

    this.dataGateway.emitData({ action: 'company/create', data: company });

    return company;
  }

  async findAll(): Promise<Array<ICompany>> {
    return await this.companyRepository.find();
  }

  async findOne(companyId: string): Promise<ICompany> {
    const company = await this.companyRepository.findOne({
      where: { companyId },
    });

    if (!company) throw new NotFoundException('Company not found');

    return company;
  }

  async update(
    companyId: string,
    updateCompany: IUpdateCompany,
  ): Promise<ICompany> {
    const updateResult: UpdateResult = await this.companyRepository.update(
      companyId,
      { ...updateCompany },
    );

    if (!updateResult.affected)
      throw new NotFoundException('Company information could not be updated.');

    const company: ICompany = await this.companyRepository.findOne({
      where: { companyId },
    });

    this.dataGateway.emitData({ action: 'company/update', data: company });

    return company;
  }

  async remove(companyId: string): Promise<string> {
    const deleteResult: DeleteResult =
      await this.companyRepository.delete(companyId);

    if (!deleteResult.affected)
      throw new NotFoundException('Company not found.');

    this.dataGateway.emitData({
      action: 'company/delete',
      data: { companyId },
    });

    return companyId;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Headquarter } from 'src/Data/entities/headquarter-entity/headquarter.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  ICreateHeadquarter,
  IHeadquarter,
  IUpdateHeadquarter,
} from 'src/Data/interfaces/api/headquarter-interface/headquarter.interface';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Injectable()
export class HeadquarterService {
  @InjectRepository(Headquarter)
  private readonly headquarterRepository: Repository<Headquarter>;

  constructor(private readonly dataGateway: DataGateway) {}

  async create({
    companyId,
    ...createHeadquarter
  }: ICreateHeadquarter): Promise<IHeadquarter> {
    const { headquarterId }: IHeadquarter =
      await this.headquarterRepository.save({
        company: { companyId },
        ...createHeadquarter,
      });

    const headquarter = await this.headquarterRepository.findOne({
      where: { headquarterId },
    });

    this.dataGateway.emitData({
      acction: 'headquarter/create',
      data: headquarter,
    });

    return headquarter;
  }

  async findAll(): Promise<Array<IHeadquarter>> {
    return await this.headquarterRepository.find({});
  }

  async findOne(headquarterId: string): Promise<IHeadquarter> {
    const headquarter = await this.headquarterRepository.findOne({
      where: { headquarterId },
    });

    if (!headquarter) {
      throw new NotFoundException('Headquarter not found.');
    }

    return headquarter;
  }

  async update(
    headquarterId: string,
    updateHeadquarter: IUpdateHeadquarter,
  ): Promise<IHeadquarter> {
    const updateResult: UpdateResult = await this.headquarterRepository.update(
      headquarterId,
      { ...updateHeadquarter },
    );

    if (!updateResult.affected)
      throw new NotFoundException(
        'Headquarter information could not be updated.',
      );

    const headquarter: IHeadquarter = await this.headquarterRepository.findOne({
      where: { headquarterId },
    });

    this.dataGateway.emitData({
      acction: 'headquarter/update',
      data: headquarter,
    });

    return headquarter;
  }

  async remove(headquarterId: string): Promise<string> {
    const deleteResult: DeleteResult =
      await this.headquarterRepository.delete(headquarterId);

    if (!deleteResult.affected)
      throw new NotFoundException('Headquarer not found.');

    this.dataGateway.emitData({
      acction: 'headquarter/delete',
      data: { headquarterId },
    });

    return headquarterId;
  }
}

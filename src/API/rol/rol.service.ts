import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Rol } from 'src/Data/entities/rol-entity/rol.entity';
import {
  ICreateRol,
  IRol,
  IUpdateRol,
} from 'src/Data/interfaces/api/rol-interfaces/rol.interface';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Injectable()
export class RolService {
  @InjectRepository(Rol)
  private readonly rolRepository: Repository<Rol>;

  constructor(private readonly dataGateway: DataGateway) {}

  async create({ ...createRol }: ICreateRol): Promise<IRol> {
    const { rolId }: IRol = await this.rolRepository.save({
      ...createRol,
    });

    const rol = await this.rolRepository.findOne({ where: { rolId } });

    this.dataGateway.emitData({ acction: 'rol/create', data: rol });

    return rol;
  }

  async findAll(): Promise<Array<IRol>> {
    return await this.rolRepository.find();
  }

  async findOne(rolId: string): Promise<IRol> {
    const rol = await this.rolRepository.findOne({
      where: { rolId },
    });

    if (!rol) {
      throw new NotFoundException('Rol not found');
    }

    return rol;
  }

  async update(rolId: string, updateRol: IUpdateRol): Promise<IRol> {
    const updateResult: UpdateResult = await this.rolRepository.update(rolId, {
      ...updateRol,
    });

    if (!updateResult)
      throw new NotFoundException('Rol information could not be updated.');

    const rol: IRol = await this.rolRepository.findOne({
      where: { rolId },
    });

    this.dataGateway.emitData({ acction: 'rol/update', data: rol });

    return rol;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from 'src/Data/entities/rol-entity/rol.entity';
import {
  ICreateRol,
  IRol,
} from 'src/Data/interfaces/api/rol-interfaces/rol.interface';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}
  async create({ ...createRol }: ICreateRol): Promise<IRol> {
    const { rolId }: IRol = await this.rolRepository.save({
      ...createRol,
    });

    const rol = await this.rolRepository.findOne({ where: { rolId } });

    return rol;
  }

  async findAll(): Promise<Array<IRol>> {
    return await this.rolRepository.find();
  }

  async findOne(id: string): Promise<IRol> {
    const rol = await this.rolRepository.findOne({
      where: { rolId: id },
    });
    if (!rol) {
      throw new NotFoundException('Rol not found');
    }
    return rol;
  }

  async update(id: string, updateRolDto: UpdateRolDto): Promise<IRol> {
    const rol = await this.rolRepository.findOne({
      where: { rolId: id },
    });
    if (!rol) {
      throw new NotFoundException('Rol not found');
    }

    Object.assign(rol, updateRolDto);

    return this.rolRepository.save(rol);
  }
}

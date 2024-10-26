import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Data/entities/user-entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  ICreateUser,
  IUser,
} from 'src/Data/interfaces/api/user-interface/user.interface';
import { Rol } from 'src/Data/entities/rol-entity/rol.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create({
    rolId,
    employeeId,
    ...createUser
  }: ICreateUser): Promise<IUser> {
    createUser.userPassword = await bcrypt.hash(createUser.userPassword, 10);

    const { userId }: IUser = await this.userRepository.save({
      rol: { rolId },
      employee: { employeeId },
      ...createUser,
    });

    const user = await this.userRepository.findOne({ where: { userId } });

    delete user.userPassword;

    return user;
  }

  findOneByEmail(userEmail: string) {
    return this.userRepository.findOne({
      where: { userEmail },
      relations: ['rol'],
    });
  }

  async findAll(): Promise<Array<IUser>> {
    const user = await this.userRepository.find({
      select: ['userId', 'userName', 'userEmail'],
      relations: ['rol', 'employee'],
    });
    return user;
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.userRepository.findOne({
      where: { userId: id },
      relations: ['rol', 'employee'],
    });
    delete user.userPassword;
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const user = await this.userRepository.findOne({ where: { userId: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if ('userPassword' in updateUserDto) {
      delete updateUserDto.userPassword;
    }

    if (updateUserDto.rolId) {
      const rol = await this.rolRepository.findOne({
        where: { rolId: updateUserDto.rolId },
      });
      if (!rol) {
        throw new NotFoundException('Rol not found');
      }
      user.rol = rol;
    }

    Object.assign(user, updateUserDto);

    delete user.userPassword;

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.userRepository.delete(id);
  }
}

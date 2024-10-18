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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Método para crear un nuevo usuario
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
    return this.userRepository.findOneBy({ userEmail });
  }

  //Método para listar todos los usuarios
  async findAll(): Promise<Array<IUser>> {
    const user = await this.userRepository.find({
      select: ['userId', 'userName', 'userEmail'],
      relations: ['rol', 'employee'],
    });
    return user;
  }

  //Método para listar usuario por uuid
  async findOne(id: string): Promise<IUser> {
    const user = await this.userRepository.findOne({
      where: { userId: id },
      relations: ['rol', 'employee'],
    });
    delete user.userPassword;
    return user;
  }

  //Método para actualizar a usuarios
  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const user = await this.userRepository.findOne({ where: { userId: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if ('userPassword' in updateUserDto) {
      delete updateUserDto.userPassword;
    }

    Object.assign(user, updateUserDto);

    delete user.userPassword;

    return this.userRepository.save(user);
  }

  //Método para borrar a usuarios
  async remove(id: string) {
    await this.findOne(id);
    return await this.userRepository.delete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Data/entities/user-entity/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  ICreateUser,
  IUpdateUser,
  IUser,
} from 'src/Data/interfaces/api/user-interface/user.interface';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  constructor(private readonly dataGateway: DataGateway) {}

  async create({
    rolId,
    employeeId,
    ...createUser
  }: ICreateUser): Promise<IUser> {
    createUser.userPassword = await bcrypt.hash(createUser.userPassword, 10);

    if (!employeeId) {
      employeeId = null;
    }

    const { userId }: IUser = await this.userRepository.save({
      rol: { rolId },
      employee: { employeeId },
      ...createUser,
    });

    const user = await this.userRepository.findOne({ where: { userId } });

    delete user.userPassword;

    this.dataGateway.emitData({ acction: 'user/create', data: user });

    return user;
  }

  findOneByEmail(userEmail: string) {
    return this.userRepository.findOne({
      where: { userEmail },
      relations: ['rol', 'rol.permission'],
    });
  }

  async findAll(): Promise<Array<IUser>> {
    const user = await this.userRepository.find({
      select: ['userId', 'userName', 'userEmail'],
    });
    return user;
  }

  async findOne(userId: string): Promise<IUser> {
    const user = await this.userRepository.findOne({
      where: { userId },
    });

    delete user.userPassword;

    return user;
  }

  async update(userId: string, updateUser: IUpdateUser): Promise<IUser> {
    const updateResult: UpdateResult = await this.userRepository.update(
      userId,
      { ...updateUser },
    );

    if (!updateResult.affected)
      throw new NotFoundException('User information could not be updated.');

    const user: IUser = await this.userRepository.findOne({
      where: { userId },
    });

    delete user.userPassword;

    this.dataGateway.emitData({ acction: 'user/update', data: user });

    return user;
  }

  async remove(userId: string): Promise<string> {
    const deleteResult: DeleteResult = await this.userRepository.delete(userId);

    if (!deleteResult.affected) throw new NotFoundException('User not found.');

    this.dataGateway.emitData({ acction: 'user/delete', data: { userId } });

    return userId;
  }
}

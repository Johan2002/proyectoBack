import { Rol } from '../../Data/entities/rol-entity/rol.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Data/entities/user-entity/user.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/Data/entities/employee-entity/employee.entity';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/Data/interfaces/user-interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  // Método para crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const { rol: rolId, employee: employeeId, userId, password, ...userData } = createUserDto;

    const rol = await this.rolRepository.findOne({ where: { rolId } });
    if (!rol) {
      throw new NotFoundException('Rol not found');
    }
    const employee = await this.employeeRepository.findOne({ where: { employeeId } });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.create({
      ...userData,
      password: hashpassword,
      employee: employee,
      rol: rol,
    });

    return this.userRepository.save(newUser);
  }

  //Método para listar todos los usuarios
  async findAll(): Promise<Array<IUser>> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.userRepository.findOne({ where: { userId: id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const user = await this.userRepository.findOne({ where: { userId: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.userRepository.softDelete(id);
  }
}

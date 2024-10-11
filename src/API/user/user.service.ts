import { Rol } from '../../Data/entities/rol-entity/rol.entity';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Data/entities/user-entity/user.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/Data/entities/employee-entity/employee.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>

  ){}

  // Método para crear un nuevo usuario
  async create(userName: string, password: string, employeeId: string, rolId: string): Promise<User> {

    const existingUser = await this.userRepository.findOne({ where: { userName } });
    if (existingUser) {
        throw new ConflictException(`El nombre de usuario '${userName}' ya está en uso.`);
    }

    const employee = await this.employeeRepository.findOne({ where: { employeeId: employeeId } });
    const rol = await this.rolRepository.findOne({ where: { rolId : rolId } });

    if (!employee) {
      throw new NotFoundException(`Empleado con ID ${employeeId} no encontrado`);
    }
    if (!rol) {
      throw new NotFoundException(`Rol con ID ${rolId} no encontrado`);
    }

    const hashpassword = await bcrypt.hash(password, 10) // Encriptar la contraseña

    const newUser = this.userRepository.create({
      userName,
      password: hashpassword,
      employee,
      rol,
    });

    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['employee', 'rol'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}

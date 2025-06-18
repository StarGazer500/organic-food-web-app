import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { AdminUser } from '../../domain/entities/account/adminusers.entity';
import { Role } from '../../domain/entities/account/role.entity';
import { CreateUserDto } from '../../application/dto/account/create-adminuser.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(AdminUser)
    private userRepository: Repository<AdminUser>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<AdminUser> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<AdminUser[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.userRepository.findOne({
      where: { id },
      
    });
  }

  async findByEmail(email: string): Promise<any> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }



  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findActiveUsers(): Promise<AdminUser[]> {
    return await this.userRepository.find({
      where: { isActive: true },
    });
  }

  async findUsersByAge(minAge: number, maxAge: number): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.age BETWEEN :minAge AND :maxAge', { minAge, maxAge })
      .getMany();
  }

  
}
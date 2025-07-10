import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { AdminUser } from '../../domain/entities/account/adminusers.entity';
import { Role } from '../../domain/entities/account/role.entity';
import { CreateAdminUserDto } from '../../application/dto/account/create-adminuser.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AdminUserRepository {
  constructor(
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateAdminUserDto): Promise<AdminUser> {
    const user = this.adminUserRepository.create(createUserDto);
    return await this.adminUserRepository.save(user);
  }

  async findAll(): Promise<AdminUser[]> {
    return await this.adminUserRepository.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.adminUserRepository.findOne({
      where: { id },
      
    });
  }

  async findByEmail(email: string): Promise<any> {
    return await this.adminUserRepository.findOne({
      where: { email },
    });
  }

  async findByPassword(password: string): Promise<any> {
    return await this.adminUserRepository.findOne({
      where: { password },
    });
  }

  async findByRole(roleName: string): Promise<AdminUser[]> {
  return await this.adminUserRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.roles', 'role')
    .where('role.name = :roleName', { roleName })
    .getMany();
}




  async remove(id: number): Promise<void> {
    await this.adminUserRepository.delete(id);
  }

  async findActiveUsers(): Promise<AdminUser[]> {
    return await this.adminUserRepository.find({
      where: { isActive: true },
    });
  }


  
}
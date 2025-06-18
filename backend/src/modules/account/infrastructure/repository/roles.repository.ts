import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Role } from '../../domain/entities/account/role.entity';
import { CreateRoleDto } from '../../application/dto/account/create-role.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role )
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateRoleDto): Promise<Role> {
    const user = this.roleRepository.create(createUserDto);
    return await this.roleRepository.save(user);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.roleRepository.findOne({
      where: { id },
      
    });
  }

  

  async remove(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }


 

  
}
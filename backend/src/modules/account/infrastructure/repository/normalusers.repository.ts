import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { NormalUser } from '../../domain/entities/account/normalusers.entity';
import { CreateNormalUserDto } from '../../application/dto/account/create-normaluser.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class NormalUserRepository {
  constructor(
    @InjectRepository(NormalUser)
    private readonly normalUserRepository: Repository<NormalUser>,
  ) {}

  async create(createUserDto:  CreateNormalUserDto): Promise<NormalUser> {
    const user = this.normalUserRepository.create(createUserDto);
    return await this.normalUserRepository.save(user);
  }

  async findAll(): Promise<NormalUser[]> {
    return await this.normalUserRepository.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.normalUserRepository.findOne({
      where: { id },
      
    });
  }

  async findByEmail(email: string): Promise<any> {
    return await this.normalUserRepository.findOne({
      where: { email },
    });
  }

  async findByPassword(password: string): Promise<any> {
    return await this.normalUserRepository.findOne({
      where: { password },
    });
  }



  async remove(id: number): Promise<void> {
    await this.normalUserRepository.delete(id);
  }

  async findActiveUsers(): Promise<NormalUser[]> {
    return await this.normalUserRepository.find({
      where: { isActive: true },
    });
  }



  
}
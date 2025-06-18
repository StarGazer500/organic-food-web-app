import { Injectable,NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/repository/adminusers.repository';
import { AdminUser} from '../../../domain/entities/account/adminusers.entity';
import { CreateAdminUserDto } from '../../dto/account/create-adminuser.dto';

@Injectable()
export class AdminAccountService {
constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateAdminUserDto): Promise<AdminUser> {
    return await this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<AdminUser[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<AdminUser> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

//   async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
//     const user = await this.findOne(id); // This will throw if user doesn't exist
//     return await this.userRepository.update(id, updateUserDto);
//   }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(id);
  }

  async findByEmail(email: string): Promise<AdminUser> {
    return await this.userRepository.findByEmail(email);
  }
}




// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';

// @Injectable()
// export class UserService {
//   constructor(private readonly userRepository: UserRepository) {}

//   async create(createUserDto: CreateUserDto): Promise<User> {
//     return await this.userRepository.create(createUserDto);
//   }

//   async findAll(): Promise<User[]> {
//     return await this.userRepository.findAll();
//   }

//   async findOne(id: number): Promise<User> {
//     const user = await this.userRepository.findOne(id);
//     if (!user) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }
//     return user;
//   }

// //   async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
// //     const user = await this.findOne(id); // This will throw if user doesn't exist
// //     return await this.userRepository.update(id, updateUserDto);
// //   }

//   async remove(id: number): Promise<void> {
//     const user = await this.findOne(id);
//     await this.userRepository.remove(id);
//   }

//   async findByEmail(email: string): Promise<User> {
//     return await this.userRepository.findByEmail(email);
//   }
// }
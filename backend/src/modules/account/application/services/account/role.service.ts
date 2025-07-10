import { Injectable,NotFoundException } from '@nestjs/common';
import { RoleRepository} from '../../../infrastructure/repository/roles.repository';
import { Role} from '../../../domain/entities/account/role.entity';
import { CreateRoleDto } from '../../dto/account/create-role.dto';


@Injectable()
export class AdminRoleService {
constructor(private readonly roleRepository: RoleRepository) {}
  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
        
    
    return await this.roleRepository.create(createRoleDto);
  }

 

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.findAll();
  }

  async findOne(id: number): Promise<Role> {
    const user = await this.roleRepository.findOne(id);
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
    await this.roleRepository.remove(id);
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
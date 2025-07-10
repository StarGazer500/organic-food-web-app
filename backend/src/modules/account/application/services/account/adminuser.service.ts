import { Injectable,NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminUserRepository } from '../../../infrastructure/repository/adminusers.repository';
import { AdminUser} from '../../../domain/entities/account/adminusers.entity';
import { CreateAdminUserDto,LoginAdminDto,JwtPayloadDto } from '../../dto/account/create-adminuser.dto';
import {JwtSignService} from '../../../../../common/jwtauth/jwtauth.service'
import * as bcrypt from 'bcrypt';

// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';


// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
//     });
//   }

//   async validate(payload: JwtPayload) {
//     // This is called if JWT is valid
//     return { 
//       userId: payload.sub, 
//       email: payload.email 
//     };
//   }
// }

@Injectable()
export class AdminAccountService {
constructor(
  private readonly userRepository: AdminUserRepository,
  private jwtsignService: JwtSignService
) {}

  async create(createUserDto: CreateAdminUserDto): Promise<AdminUser> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // 10 is the salt rounds
    const userToCreate = {
      ...createUserDto,
      password: hashedPassword,
    };

  return await this.userRepository.create(userToCreate);
}

  async login(loginDto: LoginAdminDto): Promise<object> {
      const user = await this.userRepository.findByEmail(loginDto.email);
      
      if (!user) {
        throw new NotFoundException('Invalid email or password');
      }

      // Compare hashed password
      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
      if (!isPasswordValid) {
        throw new NotFoundException('Invalid email or password');
      }

      // Check if user has the role
      const hasRole = user.hasRole(loginDto.role);
      if (!hasRole) {
        throw new NotFoundException('Invalid role');
      }

      const payload: JwtPayloadDto = {
        email: user.email,
        sub: user.id,
        role: loginDto.role,
      };

      return {
        access_token: this.jwtsignService.signJwt(payload),
        user: {
          id: user.id,
          email: user.email,
          roles: user.getRoleNames(),
        },
      };
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
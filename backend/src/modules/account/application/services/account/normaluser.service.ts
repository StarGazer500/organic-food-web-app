import { Injectable,NotFoundException,Logger } from '@nestjs/common';
import { NormalUserRepository } from '../../../infrastructure/repository/normalusers.repository';
import { NormalUser} from '../../../domain/entities/account/normalusers.entity';
import { CreateNormalUserDto,LoginNormalUserDto,JwtNormalUserPayloadDto} from '../../dto/account/create-normaluser.dto';
import {JwtSignService} from '../../../../../common/jwtauth/jwtauth.service'
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class NormalUserAccountService {
private readonly logger = new Logger(NormalUserAccountService.name)  
constructor(
  private readonly userRepository: NormalUserRepository,
private jwtsignService: JwtSignService
) {}
  async create(createUserDto: CreateNormalUserDto): Promise<NormalUser> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userToCreate = {
      ...createUserDto,
      password: hashedPassword,
    };
    return await this.userRepository.create(userToCreate);
  }

  async login(loginDto: LoginNormalUserDto, response: Response): Promise<object> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    
    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }
  
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid email or password');
    }
  
   
  
    const payload: JwtNormalUserPayloadDto = {
      email: user.email,
      sub: user.id,
    };
  
    const access_token = await this.jwtsignService.signNormalUserJwt(payload);
    
    // Set HTTP-only cookie instead of returning token
    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only over HTTPS in production
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });
  
    if (access_token) {
      this.logger.log(JSON.stringify(access_token))
    } else {
      this.logger.log("user is not valid");
    }
  
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async findAll(): Promise<NormalUser[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<NormalUser> {
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

  async findByEmail(email: string): Promise<NormalUser> {
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
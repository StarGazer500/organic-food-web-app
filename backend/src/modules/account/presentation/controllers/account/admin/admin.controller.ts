import { Controller,Get, UseGuards, Req, Post,Body  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {AdminAccountService} from '../../../../application/services/account/adminuser.service'
import {LoginAdminDto,CreateAdminUserDto} from '../../../../application/dto/account/create-adminuser.dto'
import{AdminGuard} from '../../../../../../common/jwtauth/admin-guard.guard'

@Controller('admin-auth')
export class AdminAuthController {

    constructor(private readonly adminAccountService: AdminAccountService) {}

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Get()
    async testJwtVerify(@Req() req) {
      return req.user; // 👈 user info comes from `validate()` in JwtStrategy
    }


    @Post('login')
    async login(@Body() loginDto: LoginAdminDto) {
      return this.adminAccountService.login(loginDto);
    }

    // @Post('test-route')
    // async testRoute() {
    //   return { message: "route reached" };
    //   // return this.adminAccountService.create(createDto);
    // }


    // @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Post('create-account')
    async createAccount(@Body() createDto: CreateAdminUserDto) {
      // return "route reached"
      return this.adminAccountService.create(createDto);
    }

}


// @Controller('test-signjwt-route')
// export class AdminSignController {
//   constructor(private readonly adminAccountService: AdminAccountService) {}

//   @Post('login')
//   async login(@Body() loginDto: LoginAdminDto) {
//     return this.adminAccountService.login(loginDto);
//   }
// }

// @Controller('test-signjwt-route')
// export class AdminCreateAdminController {
//   constructor(private readonly adminAccountService: AdminAccountService) {}
//   @UseGuards(AuthGuard('jwt'), AdminGuard)
//   @Post('create-account')
//   async createAccount(@Body() createDto: CreateAdminUserDto) {
    
//     return this.adminAccountService.create(createDto);
//   }
// }
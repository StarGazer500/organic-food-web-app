import { Controller, Get, UseGuards, Req, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AdminAccountService } from '../../../../application/services/account/adminuser.service';
import { LoginAdminDto, CreateAdminUserDto } from '../../../../application/dto/account/create-adminuser.dto';
import { SuperUserAdminGuard } from '../../../../../../common/jwtauth/admin-guard.guard';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAccountService: AdminAccountService) {}

  // @UseGuards(AuthGuard('jwt'), SuperUserAdminGuard)
  // @Get()
  // async testJwtVerify(@Req() req: any) {
  //   return req.user;
  // }

  @Post('login')
  async login(@Body() loginDto: LoginAdminDto, @Res({ passthrough: true }) response: Response) {
    return this.adminAccountService.login(loginDto, response);
  }

  @UseGuards(AuthGuard('jwt'), SuperUserAdminGuard)
  @Post('create-account')
  async createAccount(@Body() createDto: CreateAdminUserDto) {
    return this.adminAccountService.create(createDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }
}
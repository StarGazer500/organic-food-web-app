import { Controller, Get, UseGuards, Req, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {NormalUserAccountService} from '../../../../application/services/account/normaluser.service'
import {LoginNormalUserDto,CreateNormalUserDto} from '../../../../application/dto/account/create-normaluser.dto'

@Controller('normaluser')
export class NormaluserAuthController {
    constructor(private readonly normaluserAccountService: NormalUserAccountService) {}
      @Post('create-account')
      async createAccount(@Body() createDto: CreateNormalUserDto) {
        return this.normaluserAccountService.create(createDto);
      }

       @Post('login')
        async login(@Body() loginDto: CreateNormalUserDto, @Res({ passthrough: true }) response: Response) {
          return this.normaluserAccountService.login(loginDto, response);
        }

        @Post('logout')
        @UseGuards(AuthGuard('jwt'))
        async logout(@Res({ passthrough: true }) response: Response) {
            response.clearCookie('access_token');
            return { message: 'Logged out successfully' };
        }


}

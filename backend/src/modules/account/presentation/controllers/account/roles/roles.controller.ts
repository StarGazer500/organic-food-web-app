
import { Controller,Get, UseGuards, Req, Post,Body  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {AdminRoleService} from '../../../../application/services/account/role.service'
import {CreateRoleDto} from '../../../../application/dto/account/create-role.dto'
import {SuperUserAdminGuard} from '../../../../../../common/jwtauth/admin-guard.guard'

@Controller('roles')
export class RolesController {
     constructor(private readonly adminRoleService: AdminRoleService) {}
      @UseGuards(AuthGuard('jwt'), SuperUserAdminGuard)
      @Post('create-role')
      async createRole(@Body() createroleDto: CreateRoleDto) {
        return this.adminRoleService.createRole(createroleDto);
      }
}

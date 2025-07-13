import { Module } from '@nestjs/common';
// import { AccountController } from './presentation/controllers/account/account.controller';
import { AdminAccountService } from './application/services/account/adminuser.service';
import {AdminRoleService} from './application/services/account/role.service'
import {JwtauthModule} from '../../common/jwtauth/jwtauth.module'
import { AdminAuthController} from './presentation/controllers/account/admin/admin.controller';
import { RolesController } from './presentation/controllers/account/roles/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './domain/entities/account/adminusers.entity';
import { Role } from './domain/entities/account/role.entity';
import { NormalUser } from './domain/entities/account/normalusers.entity';
import { AdminUserRepository } from './infrastructure/repository/adminusers.repository';
import {RoleRepository} from './infrastructure/repository/roles.repository'
import { NormaluserAuthController } from './presentation/controllers/account/normaluser/normaluser.controller';
import {NormalUserRepository} from './infrastructure/repository/normalusers.repository'
import {NormalUserAccountService} from './application/services/account/normaluser.service'

@Module({
  imports: [
    JwtauthModule,
    TypeOrmModule.forFeature([AdminUser, Role,NormalUser]) // 👈 register repositories
  ],
  controllers: [AdminAuthController, RolesController, NormaluserAuthController],
  providers: [AdminAccountService,AdminRoleService, AdminUserRepository,RoleRepository,NormalUserAccountService,NormalUserRepository], // 👈 add repository provider
})
export class AccountModule {}

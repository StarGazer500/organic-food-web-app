import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtSignService,JwtAdminStrategy,JwtNormalUserStrategy } from './jwtauth.service';
import {SuperUserAdminGuard} from './admin-guard.guard'


@Module({

   imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  
  providers: [JwtSignService,JwtAdminStrategy,JwtNormalUserStrategy,SuperUserAdminGuard],
  exports:[JwtSignService,JwtAdminStrategy,JwtNormalUserStrategy,SuperUserAdminGuard]
})
export class JwtauthModule {}

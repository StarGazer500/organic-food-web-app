import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtSignService,JwtStrategy } from './jwtauth.service';
import {AdminGuard} from './admin-guard.guard'


@Module({

   imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  
  providers: [JwtSignService,JwtStrategy,AdminGuard],
  exports:[JwtSignService,JwtStrategy,AdminGuard]
})
export class JwtauthModule {}

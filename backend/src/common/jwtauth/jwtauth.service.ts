import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayloadDto } from '../../modules/account/application/dto/account/create-adminuser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtSignService {
    constructor( private jwtService: JwtService){}
    async signJwt(payload:JwtPayloadDto):Promise<string>{
        return this.jwtService.sign(payload)
    }
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: JwtPayloadDto) {
    // This is called if JWT is valid
    return { 
      userId: payload.sub, 
      email: payload.email, 
      role: payload.role
    };
  }
}
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JwtAdminPayloadDto } from '../../modules/account/application/dto/account/create-adminuser.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {JwtNormalUserPayloadDto} from '../../modules/account/application/dto/account/create-normaluser.dto'


@Injectable()
export class JwtSignService {
    constructor( private jwtService: JwtService){}
    async signAdminJwt(payload:JwtAdminPayloadDto):Promise<string>{
        return this.jwtService.sign(payload)
    }
    async signNormalUserJwt(payload:JwtNormalUserPayloadDto):Promise<string>{
        return this.jwtService.sign(payload)
    }
}


@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: JwtAdminPayloadDto) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}


@Injectable()
export class JwtNormalUserStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: JwtAdminPayloadDto) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
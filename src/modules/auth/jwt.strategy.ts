import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { JwtPayload } from './typings/payload';
import { configService } from 'src/config/config.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // private usersService: UsersService;

  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getValue('JWT_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtPayload): Promise<User> {
    // const contextId = ContextIdFactory.getByRequest(request);
    // this.usersService = await this.moduleRef.resolve(UsersService, contextId);
    const user = await this.usersService.findOneById(payload.id);
    // Safe to assume that user will always exist
    return user!;
  }
}

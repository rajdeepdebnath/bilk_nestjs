import { configService } from 'src/config/config.service';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './typings/payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(id: number) {
    const expiresIn = configService.getValue('JWT_EXPIRY_TIME');

    const user: JwtPayload = { id };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}

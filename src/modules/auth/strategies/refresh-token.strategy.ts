import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { DealersService } from '../../dealers/dealers.service';
import { TokenPayload } from '../../../core/interfaces/common.interface';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly dealersService: DealersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.refreshSecret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TokenPayload) {
    const refreshToken = req?.get('Authorization')?.replace('Bearer', '').trim();
    const dealer = await this.dealersService.findById(payload.sub);
    if (!dealer?.refreshToken || dealer.refreshToken !== refreshToken) {
      throw new UnauthorizedException();
    }
    return dealer;
  }
}
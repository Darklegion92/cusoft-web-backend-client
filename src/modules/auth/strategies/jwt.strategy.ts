import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { DealersService } from '../../dealers/dealers.service';
import { TokenPayload } from '../../../core/interfaces/common.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly dealersService: DealersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: TokenPayload) {
    const dealer = await this.dealersService.findById(payload.sub);
    if (!dealer) {
      throw new UnauthorizedException();
    }
    return dealer;
  }
}


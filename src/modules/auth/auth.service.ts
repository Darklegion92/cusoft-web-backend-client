import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { DealersService } from '../dealers/dealers.service';
import { LoginDto } from './dto/login.dto';
import { TokenPayload } from '../../core/interfaces/common.interface';
import { Dealer } from '../dealers/entities/dealer.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly dealersService: DealersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async validateDealer(email: string, password: string) {
    const dealer = await this.dealersService.findByEmail(email);
    if (dealer && await bcrypt.compare(password, dealer.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = dealer;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const dealer = await this.validateDealer(loginDto.email, loginDto.password);
    if (!dealer) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(dealer as Dealer);
    await this.dealersService.setRefreshToken(dealer.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      dealer,
    };
  }

  async refreshToken(dealerId: number, refreshToken: string) {
    const dealer = await this.dealersService.findById(dealerId);
    if (!dealer || dealer.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(dealer);
    await this.dealersService.setRefreshToken(dealer.id, tokens.refreshToken);

    return tokens;
  }

  private async generateTokens(dealer: Dealer) {
    const payload: TokenPayload = {
      sub: dealer.id,
      email: dealer.email,
      role: dealer.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.secret'),
        expiresIn: this.configService.get('jwt.expiresIn'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.refreshSecret'),
        expiresIn: this.configService.get('jwt.refreshExpiresIn'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}

import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { Request } from 'express';
import { Dealer } from '../dealers/entities/dealer.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Return access and refresh tokens.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Return new access token.' })
  async refreshToken(@Req() req: Request, @Body() refreshTokenDto: RefreshTokenDto) {
    const dealer = req.user as Dealer;
    return this.authService.refreshToken(dealer.id, refreshTokenDto.refresh_token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Return user profile.' })
  getProfile(@Req() req: Request) {
    return req.user;
  }
}

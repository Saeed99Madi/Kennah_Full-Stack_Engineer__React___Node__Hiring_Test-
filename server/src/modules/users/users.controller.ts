import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('api/user')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Req() req) {
    return req.user;
  }
}

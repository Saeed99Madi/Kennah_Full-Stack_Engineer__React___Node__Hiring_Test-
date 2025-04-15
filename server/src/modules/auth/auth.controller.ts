import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDocument } from '../users/schemas/user.schema';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user || !user.name) throw new Error('Invalid credentials');
    return this.authService.login(user as UserDocument);
  }
}

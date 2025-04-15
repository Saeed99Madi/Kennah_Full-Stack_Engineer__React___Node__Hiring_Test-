import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDocument } from '../users/schemas/user.schema';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({
    description: 'User registration data',
    examples: {
      example1: {
        summary: 'Register Example',
        value: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'securePassword123',
        },
      },
    },
  })
  async register(@Body() body) {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @ApiBody({
    description: 'User login data',
    examples: {
      example1: {
        summary: 'Login Example',
        value: {
          email: 'john.doe@example.com',
          password: 'securePassword123',
        },
      },
    },
  })
  async login(@Body() body) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user || !user.name) throw new Error('Invalid credentials');
    return this.authService.login(user as UserDocument);
  }
}

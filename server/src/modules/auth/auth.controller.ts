import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

interface JwtPayload {
  userId: number;
  id: number;
  email: string;
}
interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

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
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    return this.authService.login(user as UserDocument);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // Swagger: Requires authentication
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCurrentUser(@Req() req: RequestWithUser) {
    try {
      console.log(req.user, 'req.user');

      // Convert userId to ObjectId if necessary
      const userId = Types.ObjectId.isValid(req.user.userId)
        ? new Types.ObjectId(req.user.userId)
        : req.user.userId;

      const user = await this.userModel.findById(userId).exec();

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return {
        status: 'success',
        data: {
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            avatarUrl:
              user.avatarUrl ||
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fuser-avatar&psig=AOvVaw02I6dct8lxt8AbL4Tbb_-h&ust=1744814911232000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLDEw5mk2owDFQAAAAAdAAAAABAE',
          },
        },
      };
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = (await this.usersService.findByEmail(email)) as UserDocument;
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }
  login(user: UserDocument): { access_token: string } {
    const payload = { email: user.email, sub: user._id };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
    };
  }

  async register(userData: UserDocument): Promise<any> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });
    return this.login(newUser);
  }
}

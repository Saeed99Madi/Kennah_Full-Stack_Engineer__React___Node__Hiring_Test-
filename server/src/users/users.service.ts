import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async onModuleInit() {
    const users = await this.userModel.find();
    if (users.length === 0) {
      await this.userModel.insertMany([
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password123',
        },
        {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          password: 'password123',
        },
      ]);
      console.log('Seeded initial users');
    }
  }
}

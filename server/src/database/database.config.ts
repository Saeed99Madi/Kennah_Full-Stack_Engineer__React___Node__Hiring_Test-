import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
dotenv.config();

export const DatabaseConfig = MongooseModule.forRoot(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/nestjs-api',
);

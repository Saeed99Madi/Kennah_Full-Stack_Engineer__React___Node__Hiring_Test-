import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { DatabaseConfig } from './database/database.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseConfig, UsersModule, TasksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(createTaskDto);
    return await newTask.save();
  }

  async getTasks(userId: string): Promise<Task[]> {
    return await this.taskModel
      .find({
        userId: userId,
        status: 'pending',
      })
      .exec();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId,
  ): Promise<Task[]> {
    const checkAuth = await this.taskModel
      .findOne({
        _id: id,
        userId: userId,
      })
      .exec();
    if (!checkAuth) {
      throw new BadRequestException(`Unauthorized`);
    }

    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto)
      .exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return await this.getTasks(userId);
  }

  async deleteTask(id: string): Promise<{ _id: string }> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return { _id: id };
  }

  async updateTaskStatus(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with not found`);
    }
    if (userId !== task.userId) {
      throw new BadRequestException(`Unauthorized`);
    }
    await this.taskModel.updateOne(
      { _id: id },
      { $set: { status: 'completed' } },
    );

    return await this.getTaskById(id);
  }

  async getTodayTasks(userId: string): Promise<Task[]> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return await this.taskModel
      .find({
        userId: userId,
        status: 'pending',
        dueDate: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      })
      .exec();
  }

  async getCompletedTasks(userId: string): Promise<Task[]> {
    return await this.taskModel
      .find({
        userId: userId,
        status: 'completed',
      })
      .exec();
  }

  async unCompleteTask(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with not found`);
    }
    if (userId !== task.userId) {
      throw new BadRequestException(`Unauthorized`);
    }
    await this.taskModel.updateOne(
      { _id: id },
      { $set: { status: 'pending' } },
    );

    return await this.getTaskById(id);
  }
}

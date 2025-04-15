import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/CreateTaskDto';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('api/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({
    description: 'The task to create',
    examples: {
      example1: {
        summary: 'Example Task',
        value: {
          title: 'Sample Task',
          description: 'This is a sample task description.',
          status: 'pending',
          dueDate: '2023-09-30',
        },
      },
    },
  })
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks retrieved successfully.',
  })
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiBody({
    description: 'The task data to update',
    examples: {
      example1: {
        summary: 'Update Task Example',
        value: {
          title: 'Updated Task Title',
          description: 'Updated task description.',
          status: 'completed',
          dueDate: '2023-10-15',
        },
      },
    },
  })
  updateTask(@Param('id') id: string, @Body() updateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}

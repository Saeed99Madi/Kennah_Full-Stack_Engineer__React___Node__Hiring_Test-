import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(['pending', 'in-progress', 'completed'])
  status?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsNotEmpty()
  userId: string;
}

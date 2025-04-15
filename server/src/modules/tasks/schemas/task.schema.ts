import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  })
  status: string;

  @Prop()
  dueDate: Date;

  @Prop({ type: String, ref: 'User', required: true })
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

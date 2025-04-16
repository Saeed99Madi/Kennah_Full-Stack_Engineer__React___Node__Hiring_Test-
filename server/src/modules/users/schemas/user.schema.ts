import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    default:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fuser-avatar&psig=AOvVaw02I6dct8lxt8AbL4Tbb_-h&ust=1744814911232000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLDEw5mk2owDFQAAAAAdAAAAABAE',
  })
  avatarUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

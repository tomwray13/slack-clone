import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CreateMessageInput } from '../message.types';

export class CreateMessagelDto implements CreateMessageInput {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  channelId: number;

  @IsInt()
  userId: number;
}

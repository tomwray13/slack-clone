import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateChannelInput } from '../channel.types';

export class CreateChannelDto implements CreateChannelInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}

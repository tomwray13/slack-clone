import { Injectable } from '@nestjs/common';
// import { CreateChannelDto } from './dto/create-channel.dto';
// import { UpdateChannelDto } from './dto/update-channel.dto';
import { channels, messages } from './data';

@Injectable()
export class ChannelService {
  // create(createChannelDto: CreateChannelDto) {
  //   console.log(`createChannelDto`, createChannelDto);
  //   return 'This action adds a new channel';
  // }

  findAll() {
    return channels;
  }

  findOne(id: number) {
    const channel = channels.find((channel) => channel.id === id);
    if (!channel) {
      throw new Error('Channel not found');
    }
    return {
      ...channel,
      messages,
    };
  }

  // update(id: number, updateChannelDto: UpdateChannelDto) {
  //   return `This action updates a #${id} channel`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} channel`;
  // }
}

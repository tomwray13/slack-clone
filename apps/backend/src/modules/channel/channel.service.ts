import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ChannelService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createChannelDto: CreateChannelDto) {
    return 'This action adds a new channel';
  }

  async findAll() {
    return await this.databaseService.channel.findMany();
  }

  async findOne(id: number) {
    return await this.databaseService.channel.findUnique({
      where: {
        id,
      },
      include: {
        messages: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  update(id: number, updateChannelDto: UpdateChannelDto) {
    return `This action updates a #${id} channel`;
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}

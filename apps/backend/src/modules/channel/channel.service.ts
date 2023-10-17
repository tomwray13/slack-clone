import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ChannelService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createChannelDto: CreateChannelDto) {
    return await this.databaseService.channel.create({
      data: createChannelDto,
    });
  }

  async findAll() {
    return await this.databaseService.channel.findMany();
  }

  async findOne(id: number) {
    return await this.databaseService.channel.findUnique({
      where: { id },
      include: {
        messages: {
          include: {
            user: true,
          },
        },
      },
    });
  }
}

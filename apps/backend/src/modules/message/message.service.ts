import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateMessagelDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create({ content, channelId, userId }: CreateMessagelDto) {
    return await this.databaseService.message.create({
      data: {
        content,
        user: {
          connect: {
            id: userId,
          },
        },
        channel: {
          connect: {
            id: channelId,
          },
        },
      },
      include: {
        user: true,
      },
    });
  }
}

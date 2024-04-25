import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class MessageService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createMessageDto: CreateMessageDto) {
    return await this.databaseService.message.create({
      data: createMessageDto,
      include: {
        user: true,
      },
    });
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}

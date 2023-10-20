import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { Server } from 'socket.io';
import { CreateMessagelDto } from './dto/create-message.dto';
import { validate } from 'class-validator';

@WebSocketGateway({
  cors: {
    origin: process.env.WEB_CLIENT_URL,
  },
})
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(`sendMessage`)
  async handleEvent(
    @MessageBody()
    message: CreateMessagelDto,
  ) {
    await this.validateSendMessage(message);
    const newMessage = await this.messageService.create(message);
    this.server.emit(`newMessage`, newMessage);
    return {
      event: `sendMessage`,
      isSuccessful: true,
    };
  }

  private async validateSendMessage(message: CreateMessagelDto) {
    const payload = new CreateMessagelDto();
    payload.content = message.content;
    payload.channelId = message.channelId;
    payload.userId = message.userId;
    validate(payload).then((errors) => {
      if (errors.length > 0) {
        throw new WsException(`CreateMessageDTO validation failed!`);
      }
    });
  }
}

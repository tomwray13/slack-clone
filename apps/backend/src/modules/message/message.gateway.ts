import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(`send_message`)
  handleEvent(
    @MessageBody()
    message: {
      text: string;
      user: { id: string; firstName: string; lastName: string };
    },
  ): string {
    const newMessage = this.messageService.createMessage(message);
    this.server.emit(`new_message`, newMessage);
    return `message received`;
  }
}

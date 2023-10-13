import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessageService } from './message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    console.log(`Received message: ${data}`);
    return data;
  }
}

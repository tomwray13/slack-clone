import { Message } from '@prisma/client';

export type CreateMessageInput = Pick<
  Message,
  'content' | 'channelId' | 'userId'
>;

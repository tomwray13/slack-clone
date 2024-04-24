import {
  Channel as PrismaChannel,
  User as PrismaUser,
  Message as PrismaMessage,
} from '@prisma/client';

export type Channel = PrismaChannel;
export type User = PrismaUser;
export type Message = Omit<PrismaMessage, 'userId'> & { user: User };

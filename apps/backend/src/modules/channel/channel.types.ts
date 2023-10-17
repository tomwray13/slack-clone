import { Channel } from '@prisma/client';

export type CreateChannelInput = Pick<Channel, 'name' | 'description'>;

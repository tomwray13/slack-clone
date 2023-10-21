import { User } from '@prisma/client';

export type CreateUserInput = Pick<User, 'firstName' | 'lastName' | 'email'>;

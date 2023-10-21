import { User } from '@prisma/client';

export type CreateUserInput = Pick<User, 'firstName' | 'lastName' | 'email'>;
export type FindUserInput = Pick<User, 'email'>;

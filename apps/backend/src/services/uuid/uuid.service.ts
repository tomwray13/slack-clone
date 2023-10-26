import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class UuidService {
  generate(length?: number) {
    return nanoid(length);
  }
}

import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  private readonly redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  });

  constructor(private readonly prisma: dfd) {}
}

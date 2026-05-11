import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import Redis from 'ioredis';

@Injectable()
export class OtpService {
  constructor(
    @Inject('REDIS')
    private readonly redis: Redis,
  ) {}

  private ttl = 300;

  generate(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private hash(otp: string) {
    return crypto.createHash('sha256').update(otp).digest('hex');
  }

  async store(email: string, otp: string) {
    const key = `otp:${email}`;
    await this.redis.set(key, this.hash(otp), 'EX', this.ttl);
  }

  async verify(email: string, otp: string): Promise<boolean> {
    const key = `otp:${email}`;
    const stored = await this.redis.get(key);

    if (!stored) return false;

    const hashed = this.hash(otp);

    if (stored != hashed) {
      return false;
    }
    await this.redis.del(key);
    return true;
  }

  // save(email: string, otp: string) {
  //   this.store.set(email, this.hash(otp));
  // }

  // remove(email: string) {
  //   return this.store.delete(email);
  // }
}

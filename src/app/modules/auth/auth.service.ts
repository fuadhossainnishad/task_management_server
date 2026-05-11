import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import Redis from 'ioredis';
import { OtpService } from 'src/app/modules/auth/otp/otp.service';
import { RegistrationSessionPrismaRepository } from 'src/infrastructure/database/prisma/repositories/registration_session.repository';

@Injectable()
export class AuthService {
  private readonly redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  });

  constructor(
    @Inject('REGISTRATION_SESSION_REPOSITORY')
    private sessionRepo: RegistrationSessionPrismaRepository,
    private otpService: OtpService,
    private jwt: JwtService,
  ) {}

  async initRegitration(email: string) {
    const existing = await this.sessionRepo.findByEmail(email);
    if (existing) throw new BadRequestException('Already in process');

    const otp = this.otpService.generate();
    this.otpService.save(email, otp);

    const session = await this.sessionRepo.create({
      email,
      type: 'SELF',
      token: randomUUID(),
      expired_at: new Date(Date.now() + 10 * 60 * 1000),
    });

    return { message: 'OTP sent', sessionToken: session.token };
  }

  async VerifyOtp(email: string, otp: string, token: string) {
    const session = await this.sessionRepo.findByToken(token);
    if (!session) {
      throw new BadRequestException('Invalid session');
    }

    const ok = this.otpService.verify(email, otp);
    if (!ok) {
      throw new BadRequestException('Invalid otp');
    }

    session.status = 'VERIFIED';
    const registrationToken = this.jwt.sign({
      sub: session.id,
      email: session.email,
      type: 'registration',
    });

    return { registrationToken };
  }

  async completeRegistration(token: string, body: any) {
    const session = await this.sessionRepo.findByToken(token);
    if (!session) {
      throw new BadRequestException('Not verified');
    }

    session.status = 'COMPLETED';
    await this.sessionRepo.save(session);

    return { message: 'Account created' };
  }
}

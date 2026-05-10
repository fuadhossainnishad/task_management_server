import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';
import { CreateRegistrationSessionDto } from 'src/app/modules/auth/dto/create_registration_session.dto';
import { RegistrationSessionRepository } from 'src/domain/auth/repositories/registration_session.repository';

@Injectable()
export class RegistrationSessionPrismaRepository implements RegistrationSessionRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRegistrationSessionDto) {
    return this.prisma.registrationSession.create({
      data: {
        id: randomUUID(),
        email: data.email,
        type: data.type,
        status: 'PENDING',
        token: data.token,
        expired_at: data.expired_at,
        otp_hash: data.otp_hash ?? null,
        company_id: data.company_id ?? null,
      },
    });
  }

  async findByToken(token: string) {
    return this.prisma.registrationSession.findUnique({
      where: { token },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.registrationSession.findFirst({
      where: { email, status: { not: 'COMPLETED' } },
    });
  }

  async save(session: any) {
    return this.prisma.registrationSession.update({
      where: { id: session.id },
      data: session,
    });
  }
}

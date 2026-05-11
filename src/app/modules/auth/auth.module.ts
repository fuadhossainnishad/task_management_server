import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OtpService } from 'src/app/modules/auth/otp/otp.service';
import { TokenService } from './token/token.service';
import { RegistrationSessionPrismaRepository } from 'src/infrastructure/database/prisma/repositories/registration_session.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      //   signOptions: {
      //     expiresIn: '15m',
      //   },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    OtpService,
    TokenService,
    {
      provide: 'REGISTRATION_SESSION_REPOSITORY',
      useClass: RegistrationSessionPrismaRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

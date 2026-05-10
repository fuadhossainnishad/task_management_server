import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OtpService } from 'src/infrastructure/cache/otp.service';
import { RegistrationSessionRepository } from '../../../domain/auth/repositories/registration_session.repository';
import { TokenService } from './token/token.service';

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
    RegistrationSessionRepository,
  ],
})
export class AuthModule {}

import { Injectable } from '@nestjs/common';
import { RegistrationSessionRepository } from './repositories/registration_session.repository';
import { OtpService } from 'src/infrastructure/cache/otp.service';
import { TokenService } from 'src/app/modules/auth/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private sessionRepo: RegistrationSessionRepository,
    private otpService: OtpService,
    private tokenService: TokenService,
  ) {}
}

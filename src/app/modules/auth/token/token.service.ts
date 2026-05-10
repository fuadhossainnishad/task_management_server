import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwt: JwtService) {}

  createRegistrationToken(payload: { session_id: string; email: string }) {
    return this.jwt.sign(
      {
        sub: payload.session_id,
        email: payload.email,
        type: 'registration',
      },
      {
        expiresIn: '10m',
      },
    );
  }

  createAccessToken(payload: {
    user_id: string;
    email: string;
    company_id: string;
  }) {
    return this.jwt.sign(
      {
        sub: payload.user_id,
        email: payload.email,
        company_id: payload.company_id,
        type: 'access',
      },
      {
        expiresIn: '15m',
      },
    );
  }

  refreshToken(payload: { user_id: string }) {
    return this.jwt.sign(
      {
        sub: payload.user_id,
        type: 'refresh',
      },
      {
        expiresIn: '30d',
      },
    );
  }
}

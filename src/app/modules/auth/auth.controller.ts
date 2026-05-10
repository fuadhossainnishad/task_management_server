import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register/init')
  init(@Body('email') email: string) {
    return this.auth.initRegitration(email);
  }

  @Post('register/verify')
  verify(@Body() body: any) {
    return this.auth.VerifyOtp(body.email, body.otp, body.token);
  }

  @Post('register/complete')
  complete(@Body() body: any) {
    return this.auth.completeRegistration(body.token, body);
  }
}

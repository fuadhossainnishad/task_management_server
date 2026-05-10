import { IsEmail, IsEnum, IsOptional, IsString, IsDate } from 'class-validator';
import { SessionStatus, SessionType } from 'generated/prisma/enums';

export class CreateRegistrationSessionDto {
  @IsEmail()
  email!: string;

  @IsEnum(SessionType)
  type!: SessionType;

  @IsString()
  token!: string;

  @IsDate()
  expired_at!: Date;

  @IsOptional()
  otp_hash?: string | null;

  @IsOptional()
  company_id?: string | null;

  @IsOptional()
  invited_by?: string | null;

  @IsOptional()
  @IsEnum(SessionStatus)
  status?: SessionStatus;
}

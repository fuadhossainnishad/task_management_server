import { SessionStatus, SessionType } from 'generated/prisma/enums';

export class RegistrationSession {
  constructor(
    public readonly id: string,
    public email: string,
    public type: SessionType,
    public status: SessionStatus,
    public readonly token: string,
    public expired_at: Date,
    public otp_hash?: string | null,
    public company_id?: string | null,
    public invited_by?: string | null,
    public readonly crated_at?: Date,
    public updated_at?: Date,
  ) {}

  verify() {
    if (this.status !== 'PENDING') return;
    this.status = 'VERIFIED';
  }

  completed() {
    if (this.status !== 'VERIFIED') {
      throw new Error('Session not verified');
    }
    this.status = 'COMPLETED';
  }
}

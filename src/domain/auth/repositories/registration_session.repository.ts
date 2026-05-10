import { RegistrationSession } from '../entities/registration_session.entity';

export interface RegistrationSessionRepository {
  create(data: any): Promise<RegistrationSession>;
  findByToken(token: string): Promise<RegistrationSession | null>;
  findByEmail(email: string): Promise<RegistrationSession | null>;
  save(session: RegistrationSession): Promise<void>;
}

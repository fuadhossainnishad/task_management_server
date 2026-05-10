import { IsEmail } from 'class-validator';

export class InitRegistrationDto {
  @IsEmail()
  email!: string;
}

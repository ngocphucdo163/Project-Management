import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail({}, { message: 'invalid email' })
  email: string;

  @ApiProperty({ description: 'Username for the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Password for the user', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User email address. Use sample to has Admin role',
    example: 'admin@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

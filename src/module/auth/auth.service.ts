import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const userExist = await this.usersService.findByEmail(registerDto.email);
    if (userExist) {
      throw new BadRequestException('Email already exists');
    }
    const user = await this.usersService.create(registerDto);

    return {
      user,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await user.validatePassword(loginDto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role.name,
      permissions: user.role.permissions.map((p) => p.name),
    };

    const token = this.generateToken(payload);

    return {
      user,
      token,
    };
  }

  async resetPassword(userId: string, resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findByEmail(resetPasswordDto.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.id !== userId) {
      throw new ForbiddenException('You are not authorized to do this action');
    }
    user.password = resetPasswordDto.newPassword;
    await user.hashPassword();
    await this.usersService.updateUser(user.id, user);
    return { message: 'Password reset successfully' };
  }

  async changeEmail(userId: string, newEmail: string, password: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.id !== userId) {
      throw new ForbiddenException('You are not authorized to do this action');
    }

    const isPasswordValid = await this.validatePassword(user, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const isNewEmailValid = await this.usersService.findByEmail(newEmail);
    if (isNewEmailValid) {
      throw new BadRequestException('Email already exists');
    }

    user.email = newEmail;
    await this.usersService.updateUser(user.id, user);
  }

  private async validatePassword(
    user: User,
    password: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  private generateToken(data) {
    const payload = {
      email: data.email,
      sub: data.id,
      role: data.role,
      permission: data.permissions,
    };

    return this.jwtService.sign(payload);
  }
}

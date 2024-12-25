import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ChangeEmailDto } from './dtos/change-email.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 200, description: 'Register successfully.' })
  @ApiResponse({ status: 400, description: 'Email already exists.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({ status: 200, description: 'Reset password successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async resetPassword(
    @Req() req: any,
    @Body() resetPasswordDto: ResetPasswordDto
  ) {
    return this.authService.resetPassword(req.user.id, resetPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-email')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change user email' })
  @ApiResponse({ status: 200, description: 'Email changed successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async changeEmail(@Req() req: any, @Body() changeEmailDto: ChangeEmailDto) {
    const userId = req.user.id;
    await this.authService.changeEmail(
      userId,
      changeEmailDto.newEmail,
      changeEmailDto.password
    );
    return { message: 'Email changed successfully' };
  }
}

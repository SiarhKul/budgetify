import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('sighup')
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sighin')
  signIn(@Body() authDto: AuthDto) {
    return this.authService.sighIn(authDto.email, authDto.password);
  }
}

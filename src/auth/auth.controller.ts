import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from '../decorators/Public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sighup')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @Public()
  @Post('sighin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() authDto: AuthDto) {
    return this.authService.sighIn(authDto.email, authDto.password);
  }
}

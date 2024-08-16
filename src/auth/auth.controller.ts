import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from '../decorators/Public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sighup')
  signUp(@Body() authDto: AuthDto): Promise<string> {
    return this.authService.signUp(authDto);
  }

  @Public()
  @Post('sighin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() authDto: AuthDto): Promise<{ accessToken: string }> {
    return this.authService.sighIn(authDto.email, authDto.password);
  }
}

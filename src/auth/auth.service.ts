import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDocument } from '../schemas/user.schema';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async signUp(authDto: AuthDto): Promise<string> {
    const saltOrRounds = this.configService.get<string>('saltOrRounds');
    const hashedPassword = await bcrypt.hash(authDto.password, saltOrRounds);

    authDto.password = hashedPassword;

    try {
      const createdUser = await this.userService.create(authDto);
      const payload = { userId: createdUser._id, email: createdUser.email };

      return await this.jwtService.signAsync(payload);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
    }
  }

  async sighIn(email: string, pass: string): Promise<{ accessToken: string }> {
    const user: UserDocument | null = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Such user not found with this email');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    this.logger.log(`User with ${user.email} is visiting the app`);

    if (!isMatch) {
      throw new UnauthorizedException('Email or password not found');
    }

    const payload = { sub: user._id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}

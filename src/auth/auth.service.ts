import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
//todo inject userService instead of userModel

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(authDto: AuthDto) {
    const saltOrRounds = 2;
    const hashedPassword = await bcrypt.hash(authDto.password, saltOrRounds);

    authDto.password = hashedPassword;

    const createdUser = await this.userModel.create(authDto);

    const payload = { userId: createdUser._id, email: createdUser.email };

    return await this.jwtService.signAsync(payload);
  }

  async sighIn(email: string, pass: string): Promise<{ accessToken: string }> {
    const user: UserDocument | null = await this.userModel.findOne({
      email: email,
    });

    if (!user) {
      throw new NotFoundException('Such user not found');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    this.logger.log(`User with ${user.email} has been registered`);

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

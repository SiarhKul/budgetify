import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    //todo inject userService instead of userModel
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {
  }

  async signUp(authDto: AuthDto) {
    await this.userModel.create(authDto);
    return 'This action adds a new user';
  }

  async sighIn(email: string, pass: string) {
    const user = await this.userModel.findOne({
      email: email,
    });

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };

  }
}

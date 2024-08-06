import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async signUp(authDto: AuthDto) {
    await this.userModel.create(authDto);
    return 'This action adds a new user';
  }
}

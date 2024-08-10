import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(userDto: UsersDto) {
    return await this.userModel.create(userDto);
  }

  async findByEmail(email: string) {
    const user: UserDocument | null = await this.userModel.findOne({
      email: email,
    });

    return user;
  }
}

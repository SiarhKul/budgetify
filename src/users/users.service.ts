import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(userDto: UsersDto): Promise<UserDocument> {
    return await this.userModel.create(userDto);
  }

  async findByEmail(email: string): Promise<UserDocument> {
    const user: UserDocument | null = await this.userModel.findOne({
      email,
    });

    if (!user) {
      new NotFoundException('Such user not found with this email');
    }

    return user;
  }
}

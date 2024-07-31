import { Prop } from '@nestjs/mongoose';

export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

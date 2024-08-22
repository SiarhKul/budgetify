import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SchemasModule } from '../schemas/schemas.module';

@Module({
  imports: [JwtModule, SchemasModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}

import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { useFactoryReturn } from '../config/config.mongo';
import properties from '../config/config.parameters';
import { PiggyBankModule } from './piggy-bank/piggy-bank.module';
import { MoneyAccountModule } from './money-account/money-account.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
import { TParamsEnvVar } from './ts/config/config.union';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [
    MoneyAccountModule,
    TransactionModule,
    PiggyBankModule,
    SubscriptionModule,
    AuthModule,
    UsersModule,
    FileUploadModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [properties],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        useFactoryReturn(configService),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<TParamsEnvVar>) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
    StatisticModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
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
    AuthModule,
    UsersModule,
    FileUploadModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}

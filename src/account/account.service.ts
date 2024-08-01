import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  createAccount() {
    return 'Account created';
  }
}

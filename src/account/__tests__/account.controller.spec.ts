import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from '../account.controller';
import { AccountService } from '../account.service';
import { AccountDto } from '../dto/account.dto';
import { Currency } from '../../ts/account/account.enum';
import { ACCOUNT_ID_DUMMY, USER_ID_DUMMY } from '../../helpers/tests/doubles';

const ACCOUNT_DTO_DUMMY: AccountDto = {
  title: 'Test Account',
  description: 'This is a test account',
  currency: Currency.EUR,
  userId: USER_ID_DUMMY,
};

const mockAccountService = {
  createAccount: jest.fn(),
  updateAccount: jest.fn(),
  deleteAccount: jest.fn(),
  getAccounts: jest.fn(),
};

describe('GIVEN AccountController', () => {
  let accountController: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: mockAccountService,
        },
      ],
    }).compile();

    accountController = module.get<AccountController>(AccountController);
  });

  it('SHOULD create an account', async () => {
    // Act
    await accountController.createAccount(ACCOUNT_DTO_DUMMY, USER_ID_DUMMY);

    // Assert
    expect(mockAccountService.createAccount).toHaveBeenCalledWith(
      ACCOUNT_DTO_DUMMY,
    );
  });

  it('SHOULD update an account', async () => {
    //Act
    await accountController.updateAccount(USER_ID_DUMMY, ACCOUNT_DTO_DUMMY);

    // Assert
    expect(mockAccountService.updateAccount).toHaveBeenCalledWith(
      USER_ID_DUMMY,
      ACCOUNT_DTO_DUMMY,
    );
  });

  it('SHOULD delete an account', async () => {
    // Act
    await accountController.deleteAccount(ACCOUNT_ID_DUMMY);

    // Assert
    expect(mockAccountService.deleteAccount).toHaveBeenCalledWith(
      ACCOUNT_ID_DUMMY,
    );
  });

  it('SHOULD get all accounts', async () => {
    // Act
    await accountController.getAccounts(USER_ID_DUMMY);

    // Assert
    expect(mockAccountService.getAccounts).toHaveBeenCalledWith(USER_ID_DUMMY);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from '../money-account.controller';
import { MoneyAccountService } from '../money-account.service';
import { MoneyAccountDto } from '../dto/money-account.dto';
import { Currency } from '../../ts/account/account.enum';
import { ACCOUNT_ID_DUMMY, USER_ID_DUMMY } from '../../helpers/tests/doubles';

const ACCOUNT_DTO_DUMMY: MoneyAccountDto = {
  title: 'Test Account',
  description: 'This is a test money-account',
  currency: Currency.EUR,
  userId: USER_ID_DUMMY,
};

const mockAccountService: Partial<MoneyAccountService> = {
  createAccount: jest.fn(),
  updateAccount: jest.fn(),
  deleteAccount: jest.fn(),
  getAccountIds: jest.fn(),
  getAccountById: jest.fn(),
};

describe('GIVEN AccountController', () => {
  let accountController: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: MoneyAccountService,
          useValue: mockAccountService,
        },
      ],
    }).compile();

    accountController = module.get<AccountController>(AccountController);
  });

  it('SHOULD create an money-account', async () => {
    // Act
    await accountController.createAccount(ACCOUNT_DTO_DUMMY, USER_ID_DUMMY);

    // Assert
    expect(mockAccountService.createAccount).toHaveBeenCalledWith(
      ACCOUNT_DTO_DUMMY,
    );
  });

  it('SHOULD update an money-account', async () => {
    //Act
    await accountController.updateAccount(USER_ID_DUMMY, ACCOUNT_DTO_DUMMY);

    // Assert
    expect(mockAccountService.updateAccount).toHaveBeenCalledWith(
      USER_ID_DUMMY,
      ACCOUNT_DTO_DUMMY,
    );
  });

  it('SHOULD delete an money-account', async () => {
    // Act
    await accountController.deleteAccount(ACCOUNT_ID_DUMMY);

    // Assert
    expect(mockAccountService.deleteAccount).toHaveBeenCalledWith(
      ACCOUNT_ID_DUMMY,
    );
  });

  it('SHOULD get all accounts', async () => {
    // Act
    await accountController.getAccountIds(USER_ID_DUMMY);

    // Assert
    expect(mockAccountService.getAccountIds).toHaveBeenCalledWith(
      USER_ID_DUMMY,
    );
  });

  it('should get money-account by Id', async () => {
    //Act
    await accountController.getAccountById(ACCOUNT_ID_DUMMY);

    expect(mockAccountService.getAccountById).toHaveBeenCalledWith(
      ACCOUNT_ID_DUMMY,
    );
  });
});

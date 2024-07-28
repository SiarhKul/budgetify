import { Test, TestingModule } from '@nestjs/testing';
import { PiggyBankController } from '../piggy-bank.controller';
import { PiggyBankService } from '../piggy-bank.service';
import {
  PIGGY_BANK_DEPOSIT_DTO_DUMMY,
  PIGGY_BANK_DTO_DUMMY,
  PiggyBankDepositModel,
  PiggyBankModel,
} from '../../helpers/tests/doubles';
import { PiggyBankDto } from '../dto/piggy-bank.dto';
import { ObjectId } from 'mongodb';
import { PiggyBankDepositDto } from '../dto/piggy-bank-deposit.dto';

const mockPiggyBankService: Partial<PiggyBankService> = {
  createBiggyBank: jest
    .fn()
    .mockImplementation((piggyBankDto: PiggyBankDto) =>
      Promise.resolve(new PiggyBankModel(piggyBankDto)),
    ),
  depositToPiggyBank: jest
    .fn()
    .mockImplementation((deposit: PiggyBankDepositDto) =>
      Promise.resolve(new PiggyBankDepositModel(deposit)),
    ),
  getInfoPiggyBank: jest.fn(),
  getAllPiggyBanks: jest.fn(),
  updatePiggyBank: jest.fn(),
  deletePiggyBank: jest.fn(),
};

describe('GIVE PiggyBankController', () => {
  let controller: PiggyBankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiggyBankController],
      providers: [
        {
          provide: PiggyBankService,
          useValue: mockPiggyBankService,
        },
      ],
    }).compile();

    controller = module.get<PiggyBankController>(PiggyBankController);
  });

  it('should createBiggyBank returns correct piggy bank document', async () => {
    const { _id, deposits, goal, goalAmount } =
      await controller.create(PIGGY_BANK_DTO_DUMMY);

    expect(_id).toBeInstanceOf(ObjectId);
    expect(goal).toEqual(PIGGY_BANK_DTO_DUMMY.goal);
    expect(deposits).toEqual([]);
    expect(goalAmount).toBe(PIGGY_BANK_DTO_DUMMY.goalAmount);
  });

  it('should depositToPiggyBank returns correct piggy bank deposit', async () => {
    const { _id, piggyBankId, amountToSave, date } =
      await controller.depositToPiggyBank(PIGGY_BANK_DEPOSIT_DTO_DUMMY);

    expect(_id).toBeInstanceOf(ObjectId);
    expect(piggyBankId).toEqual(PIGGY_BANK_DEPOSIT_DTO_DUMMY.piggyBankId);
    expect(amountToSave).toEqual(PIGGY_BANK_DEPOSIT_DTO_DUMMY.amountToSave);
    expect(date).toBe(PIGGY_BANK_DEPOSIT_DTO_DUMMY.date);
  });
});

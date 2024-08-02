import { Test, TestingModule } from '@nestjs/testing';
import { PiggyBankController } from '../piggy-bank.controller';
import { PiggyBankService } from '../piggy-bank.service';
import {
  OBJECT_ID_DUMMY,
  PIGGY_BANK_DEPOSIT_DTO_DUMMY,
  PIGGY_BANK_DTO_DUMMY,
  PiggyBankDepositModel,
  PiggyBankModel,
  USER_ID_DUMMY,
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
  getInfoPiggyBank: jest.fn().mockImplementation((piggyBankId: string) => {
    return {
      _id: piggyBankId,
      goal: 'House',
      goalAmount: 100,
      sumCom: 2,
    };
  }),

  getAllPiggyBanks: jest
    .fn()
    .mockResolvedValue([
      new PiggyBankModel(PIGGY_BANK_DTO_DUMMY),
      new PiggyBankModel(PIGGY_BANK_DTO_DUMMY),
    ]),
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
    const { _id, deposits, goal, goalAmount } = await controller.create(
      PIGGY_BANK_DTO_DUMMY,
      USER_ID_DUMMY,
    );

    expect(mockPiggyBankService.createBiggyBank).toHaveBeenCalledWith(
      PIGGY_BANK_DTO_DUMMY,
    );
    expect(_id).toBeInstanceOf(ObjectId);
    expect(goal).toEqual(PIGGY_BANK_DTO_DUMMY.goal);
    expect(deposits).toEqual([]);
    expect(goalAmount).toBe(PIGGY_BANK_DTO_DUMMY.goalAmount);
  });

  it('should depositToPiggyBank returns correct piggy bank deposit', async () => {
    const { _id, piggyBankId, amountToSave, date } =
      await controller.depositToPiggyBank(PIGGY_BANK_DEPOSIT_DTO_DUMMY);

    expect(_id).toBeInstanceOf(ObjectId);
    expect(mockPiggyBankService.depositToPiggyBank).toHaveBeenCalledWith(
      PIGGY_BANK_DEPOSIT_DTO_DUMMY,
    );
    expect(piggyBankId).toEqual(PIGGY_BANK_DEPOSIT_DTO_DUMMY.piggyBankId);
    expect(amountToSave).toEqual(PIGGY_BANK_DEPOSIT_DTO_DUMMY.amountToSave);
    expect(date).toBe(PIGGY_BANK_DEPOSIT_DTO_DUMMY.date);
  });

  it('should getInfoPiggyBank returns correct piggy bank info', async () => {
    const infoPiggyBank = await controller.getInfoPiggyBank(OBJECT_ID_DUMMY);
    expect(mockPiggyBankService.getInfoPiggyBank).toHaveBeenCalledWith(
      OBJECT_ID_DUMMY,
    );
    expect(infoPiggyBank._id).toBe(OBJECT_ID_DUMMY);
  });

  it('should getAllPiggyBanks returns correct all piggy banks', async () => {
    const piggyBanks = await controller.getAllPiggyBanks(USER_ID_DUMMY);

    expect(mockPiggyBankService.getAllPiggyBanks).toHaveBeenCalledWith(
      USER_ID_DUMMY,
    );
    expect(piggyBanks).toHaveLength(2);
    expect(piggyBanks[0]._id).toBeInstanceOf(ObjectId);
    expect(piggyBanks[1]._id).toBeInstanceOf(ObjectId);
  });

  it('should updatePiggyBank called with correct arguments', async () => {
    await controller.updatePiggyBank(OBJECT_ID_DUMMY, PIGGY_BANK_DTO_DUMMY);

    expect(mockPiggyBankService.updatePiggyBank).toHaveBeenCalledWith(
      OBJECT_ID_DUMMY,
      PIGGY_BANK_DTO_DUMMY,
    );
  });

  it('should deletePiggyBank called with correct arguments', async () => {
    await controller.deletePiggyBank(OBJECT_ID_DUMMY);

    expect(mockPiggyBankService.deletePiggyBank).toHaveBeenCalledWith(
      OBJECT_ID_DUMMY,
    );
  });
});

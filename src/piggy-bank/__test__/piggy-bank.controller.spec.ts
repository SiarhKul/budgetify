import { Test, TestingModule } from '@nestjs/testing';
import { PiggyBankController } from '../piggy-bank.controller';
import { PiggyBankService } from '../piggy-bank.service';
import {
  PIGGY_BANK_DTO_DUMMY,
  PiggyBankModel,
} from '../../helpers/tests/doubles';
import { PiggyBankDto } from '../dto/piggy-bank.dto';
import { ObjectId } from 'mongodb';

const mockPiggyBankService: Partial<PiggyBankService> = {
  createBiggyBank: jest
    .fn()
    .mockImplementation(
      (piggyBankDto: PiggyBankDto) => new PiggyBankModel(piggyBankDto),
    ),
  depositToPiggyBank: jest.fn(),
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
});

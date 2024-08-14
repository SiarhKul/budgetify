import { AuthGuard } from '../auth.guard';
import type { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import {
  BadRequestException,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { PIGGY_BANK_DTO_DUMMY } from '../../helpers/tests/doubles';

const MOCK_REFLECTOR_DUMMY: Reflector = {
  getAllAndOverride: jest.fn(),
  get: jest.fn(),
  getAll: jest.fn(),
  getAllAndMerge: jest.fn(),
};

const JWT_SERVICE_DUMMY: JwtService = {
  verifyAsync: jest.fn(),
  sign: jest.fn(),
  signAsync: jest.fn(),
  verify: jest.fn(),
  decode: jest.fn(),
} as unknown as JwtService;

const CONFIG_SERVICE_DUMMY: ConfigService = {
  get: jest.fn().mockReturnValue('12345'),
} as unknown as ConfigService;

const CONTEXT_DUMMY: ExecutionContext = {
  getClass: jest.fn(),
  getHandler: jest.fn(),
  getArgs: jest.fn(),
  getArgByIndex: jest.fn(),
  switchToRpc: jest.fn(),
  switchToHttp: jest.fn(),
  switchToWs: jest.fn(),
  getType: jest.fn(),
};

describe('GIVEN AuthGuard', () => {
  it('SHOULD guard allow public endpoints', async () => {
    MOCK_REFLECTOR_DUMMY.getAllAndOverride = jest.fn().mockReturnValue(true);

    const guard = new AuthGuard(
      JWT_SERVICE_DUMMY,
      CONFIG_SERVICE_DUMMY,
      MOCK_REFLECTOR_DUMMY,
    );
    const result = guard.canActivate(CONTEXT_DUMMY);
    expect(result).toBeTruthy();
  });

  it('SHOULD throw the exception if necessary header is not present', async () => {
    MOCK_REFLECTOR_DUMMY.getAllAndOverride = jest.fn().mockReturnValue(false);
    CONTEXT_DUMMY.switchToHttp = jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: {},
      }),
    });

    const guard = new AuthGuard(
      JWT_SERVICE_DUMMY,
      CONFIG_SERVICE_DUMMY,
      MOCK_REFLECTOR_DUMMY,
    );

    await expect(guard.canActivate(CONTEXT_DUMMY)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('SHOULD throw the exception if wrong header is present', async () => {
    MOCK_REFLECTOR_DUMMY.getAllAndOverride = jest.fn().mockReturnValue(false);
    CONTEXT_DUMMY.switchToHttp = jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: 'Some token',
        },
      }),
    });

    const guard = new AuthGuard(
      JWT_SERVICE_DUMMY,
      CONFIG_SERVICE_DUMMY,
      MOCK_REFLECTOR_DUMMY,
    );

    await expect(guard.canActivate(CONTEXT_DUMMY)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('SHOULD a jwt payload be assigned to the request', async () => {
    MOCK_REFLECTOR_DUMMY.getAllAndOverride = jest.fn().mockReturnValue(false);
    CONTEXT_DUMMY.switchToHttp = jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: 'Bearer 123.token.456',
        },
      }),
    });

    JWT_SERVICE_DUMMY.verifyAsync = jest.fn().mockResolvedValue({
      sub: '66b52c3ce3762a8c03efad6d',
      email: '0@gmail.com',
      iat: 1723229670,
    });

    const guard = new AuthGuard(
      JWT_SERVICE_DUMMY,
      CONFIG_SERVICE_DUMMY,
      MOCK_REFLECTOR_DUMMY,
    );

    const result = guard.canActivate(CONTEXT_DUMMY);

    expect(result).toBeTruthy();
    expect(JWT_SERVICE_DUMMY.verifyAsync).toHaveBeenCalledWith(
      '123.token.456',
      { secret: '12345' },
    );
  });

  it('SHOULD thrown UnauthorizedException if the token fails verification', async () => {
    MOCK_REFLECTOR_DUMMY.getAllAndOverride = jest.fn().mockReturnValue(false);
    CONTEXT_DUMMY.switchToHttp = jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: 'Bearer 123.token.456',
        },
      }),
    });

    JWT_SERVICE_DUMMY.verifyAsync = jest
      .fn()
      .mockRejectedValue('Invalid token');

    const guard = new AuthGuard(
      JWT_SERVICE_DUMMY,
      CONFIG_SERVICE_DUMMY,
      MOCK_REFLECTOR_DUMMY,
    );

    await expect(guard.canActivate(CONTEXT_DUMMY)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});

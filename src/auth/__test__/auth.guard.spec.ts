import { AuthGuard } from '../auth.guard';
import type { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

const MOCK_REFLECTOR_DUMMY: Reflector = {
  getAllAndOverride: jest.fn().mockReturnValue(true),
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

const CONFIG_SERVICE_DUMMY = new ConfigService();

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
    const guard = new AuthGuard(
      JWT_SERVICE_DUMMY,
      CONFIG_SERVICE_DUMMY,
      MOCK_REFLECTOR_DUMMY,
    );

    const result = guard.canActivate(CONTEXT_DUMMY);
    expect(result).toBeTruthy();
  });
});

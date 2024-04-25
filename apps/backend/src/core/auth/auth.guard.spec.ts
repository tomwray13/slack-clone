import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('canActivate', () => {
    it('should throw UnauthorizedException if no access token is provided', async () => {
      const mockExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            cookies: {}, // No accessToken provided
          }),
        }),
      } as unknown as ExecutionContext;

      await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if access token is invalid', async () => {
      jwtService.verifyAsync = jest
        .fn()
        .mockRejectedValue(new Error('Token is invalid'));

      const mockExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            cookies: { accessToken: 'invalid-token' },
          }),
        }),
      } as unknown as ExecutionContext;

      await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should allow access when access token is valid', async () => {
      jwtService.verifyAsync = jest.fn().mockResolvedValue(true); // Token is valid

      const mockExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            cookies: { accessToken: 'valid-token' },
          }),
        }),
      } as unknown as ExecutionContext;

      await expect(authGuard.canActivate(mockExecutionContext)).resolves.toBe(
        true,
      );
    });
  });
});

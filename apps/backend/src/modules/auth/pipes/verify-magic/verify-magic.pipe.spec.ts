import { NotFoundException } from '@nestjs/common';
import { UserService } from '../../../user/user.service';
import { createMock } from '@golevelup/ts-jest';
import { CacheService } from '../../../../core/cache/cache.service';
import { VerifyMagicPipe } from './verify-magic.pipe';

describe('VerifyMagicPipe', () => {
  const userService = createMock<UserService>();
  const cacheService = createMock<CacheService>();
  const verifyMagicPipe = new VerifyMagicPipe(userService, cacheService);
  it('should be defined', () => {
    expect(verifyMagicPipe).toBeDefined();
  });

  it('should throw an error if the uuid does not exist', async () => {
    // Arrange
    const payload = `fake-uuid`;
    cacheService.get.mockResolvedValueOnce(null);

    // Act
    const result = async () => await verifyMagicPipe.transform(payload);

    // Assert
    expect(result).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should throw an error if the respective user does not exist', async () => {
    // Arrange
    const payload = `fake-uuid`;
    cacheService.get.mockResolvedValueOnce(`test@gmail.com`);
    userService.findOne.mockResolvedValueOnce(null);

    // Act
    const result = async () => await verifyMagicPipe.transform(payload);

    // Assert
    expect(result).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should return the respective user if uuid is valid and email is valid', async () => {
    // Arrange
    const payload = `fake-uuid`;
    const user = {
      id: 123,
      firstName: `Test`,
      lastName: `Test`,
      email: `test@gmail.com`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    cacheService.get.mockResolvedValueOnce(`test@gmail.com`);
    userService.findOne.mockResolvedValueOnce(user);

    // Act
    const result = async () => await verifyMagicPipe.transform(payload);

    // Assert
    expect(result()).resolves.toBe(user);
  });
});

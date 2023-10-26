import { NotFoundException } from '@nestjs/common';
import { UserService } from '../../../user/user.service';
import { createMock } from '@golevelup/ts-jest';
import { SignInPipe } from './sign-in.pipe';

describe('SignIn', () => {
  const userService = createMock<UserService>();
  const signInPipe = new SignInPipe(userService);

  it('should be defined', () => {
    expect(signInPipe).toBeDefined();
  });

  it('should return the payload if the user exists', async () => {
    // Arrange
    const payload = { email: `test@gmail.com` };
    userService.findOne.mockResolvedValueOnce({
      id: 123,
      firstName: `Test`,
      lastName: `Test`,
      email: `test@gmail.com`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Act
    const result = await signInPipe.transform(payload);

    // Assert
    expect(result).toEqual(payload);
  });

  it('should throw an error if the user does not exist', async () => {
    // Arrange
    const payload = { email: `test@gmail.com` };
    userService.findOne.mockResolvedValueOnce(null);

    // Act
    const result = async () => await signInPipe.transform(payload);

    // Assert
    expect(result).rejects.toBeInstanceOf(NotFoundException);
  });
});

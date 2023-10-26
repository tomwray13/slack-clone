import { NotFoundException } from '@nestjs/common';
import { UserService } from '../../../user/user.service';
import { SignUpPipe } from './sign-up.pipe';
import { createMock } from '@golevelup/ts-jest';

describe('SignUpPipe', () => {
  const userService = createMock<UserService>();
  const signUpPipe = new SignUpPipe(userService);
  it('should be defined', () => {
    expect(signUpPipe).toBeDefined();
  });

  it('should pass the validation if no user exists', async () => {
    // Arrange
    const payload = {
      email: `test@gmail.com`,
      firstName: `Test`,
      lastName: `Test`,
    };
    userService.findOne.mockResolvedValueOnce(null);

    // Act
    const result = await signUpPipe.transform(payload);

    // Assert
    expect(result).toEqual(payload);
  });

  it('should fail the validation if the user already exists', async () => {
    // Arrange
    const payload = {
      email: `test@gmail.com`,
      firstName: `Test`,
      lastName: `Test`,
    };
    userService.findOne.mockResolvedValueOnce({
      id: 123,
      firstName: `Test`,
      lastName: `Test`,
      email: `test@gmail.com`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Act
    const result = async () => await signUpPipe.transform(payload);

    // Assert
    expect(result).rejects.toBeInstanceOf(NotFoundException);
  });
});

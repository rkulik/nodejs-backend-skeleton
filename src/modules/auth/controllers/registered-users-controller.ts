import type { User, RegisterUserDto } from '@modules/auth/schemas/base';
import type { Factory } from '@src/factory';

export class RegisteredUsersController {
  public constructor(private factory: Factory) {}

  public create(registerUserDto: RegisterUserDto): Promise<User | undefined> {
    return this.factory.createRegisterUserAction().execute(registerUserDto);
  }
}

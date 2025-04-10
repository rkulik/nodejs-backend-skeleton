import type { Factory } from '@app/factory';
import type { User, RegisterUserDto } from '@app/modules/auth/schemas/base';

export class RegisteredUsersController {
  public constructor(private factory: Factory) {}

  public create(registerUserDto: RegisterUserDto): Promise<User | undefined> {
    return this.factory.createRegisterUserAction().execute(registerUserDto);
  }
}

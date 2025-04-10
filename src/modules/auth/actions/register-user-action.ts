import type { ReadUserAction } from '@app/modules/auth/actions/read-user-action';
import type { PasswordHandler } from '@app/modules/auth/handlers/password-handler';
import type { RegisterUserDto, User } from '@app/modules/auth/schemas/base';
import { users } from '@app/modules/auth/schemas/database';
import type { Action, Database } from '@app/types';

export class RegisterUserAction implements Action<Promise<User | undefined>> {
  public constructor(
    private database: Database,
    private readUserAction: ReadUserAction,
    private passwordHandler: PasswordHandler,
  ) {}

  public async execute(registerUserDto: RegisterUserDto): Promise<User | undefined> {
    const existingUser = this.readUserAction.execute(registerUserDto.email);
    if (existingUser) {
      return undefined;
    }

    return this.database
      .insert(users)
      .values({
        ...registerUserDto,
        password: await this.passwordHandler.hash(registerUserDto.password),
        createdAt: new Date(),
      })
      .returning()
      .get();
  }
}

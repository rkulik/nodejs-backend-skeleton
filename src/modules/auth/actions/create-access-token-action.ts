import { ReadUserAction } from '@modules/auth/actions/read-user-action';
import { JwtHandler } from '@modules/auth/handlers/jwt-handler';
import { PasswordHandler } from '@modules/auth/handlers/password-handler';
import { LoginUserDto } from '@modules/auth/schemas/base';
import { Action } from '@src/types';

export class CreateAccessTokenAction implements Action<Promise<string | undefined>> {
  public constructor(
    private readUserAction: ReadUserAction,
    private jwtHandler: JwtHandler,
    private passwordHandler: PasswordHandler,
  ) {}

  public async execute(loginUserDto: LoginUserDto): Promise<string | undefined> {
    const existingUser = this.readUserAction.execute(loginUserDto.email);
    if (!existingUser) {
      return undefined;
    }

    if (!(await this.passwordHandler.validate(loginUserDto.password, existingUser.password))) {
      return undefined;
    }

    return this.jwtHandler.sign({
      id: existingUser.id,
      name: existingUser.name,
    });
  }
}

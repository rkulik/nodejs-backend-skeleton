import type { LoginUserDto } from '@modules/auth/schemas/base';
import type { Factory } from '@src/factory';

export class AccessTokensController {
  public constructor(private factory: Factory) {}

  public create(loginUserDto: LoginUserDto): Promise<string | undefined> {
    return this.factory.createAccessTokenAction().execute(loginUserDto);
  }
}

import type { Factory } from '@app/factory';
import type { LoginUserDto } from '@app/modules/auth/schemas/base';

export class AccessTokensController {
  public constructor(private factory: Factory) {}

  public create(loginUserDto: LoginUserDto): Promise<string | undefined> {
    return this.factory.createAccessTokenAction().execute(loginUserDto);
  }
}

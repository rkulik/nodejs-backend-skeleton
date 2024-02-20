import bcrypt from 'bcrypt';

type Config = {
  saltOrRounds: string | number;
};

export class PasswordHandler {
  public constructor(private config: Config) {}

  public hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.config.saltOrRounds);
  }
}

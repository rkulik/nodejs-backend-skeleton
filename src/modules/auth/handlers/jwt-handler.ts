import jwt from 'jsonwebtoken';

type Config = {
  secret: string;
  lifetime?: number;
};

export class JwtHandler {
  public constructor(private config: Config) {}

  public sign(payload: Record<string, unknown>): string {
    const { secret, lifetime } = this.config;

    return jwt.sign(payload, secret, lifetime ? { expiresIn: lifetime } : undefined);
  }
}

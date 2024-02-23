import jwt, { JwtPayload } from 'jsonwebtoken';

type Config = {
  secret: string;
  lifetime?: number;
};

export class JwtHandler<T extends Record<string, unknown>> {
  public constructor(private config: Config) {}

  public sign(payload: T): string {
    const { secret, lifetime } = this.config;

    return jwt.sign(payload, secret, lifetime ? { expiresIn: lifetime } : undefined);
  }

  public verify<T>(token: string): (T & JwtPayload) | undefined {
    try {
      return jwt.verify(token, this.config.secret) as T & JwtPayload;
    } catch {
      return undefined;
    }
  }
}

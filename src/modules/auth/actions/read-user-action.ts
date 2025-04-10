import type { User } from '@app/modules/auth/schemas/base';
import { users } from '@app/modules/auth/schemas/database';
import type { Action, Database } from '@app/types';
import { eq } from 'drizzle-orm';

export class ReadUserAction implements Action<User | undefined> {
  public constructor(private database: Database) {}

  public execute(email: string): User | undefined {
    return this.database.select().from(users).where(eq(users.email, email)).get();
  }
}

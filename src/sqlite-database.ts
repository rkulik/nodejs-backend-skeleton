import BetterSqlite3Database from 'better-sqlite3';

export class SqliteDatabase extends BetterSqlite3Database {
  private static instance: SqliteDatabase | undefined;

  private constructor(file: string) {
    super(file);
  }

  public static getInstance(file: string): SqliteDatabase {
    if (!SqliteDatabase.instance) {
      SqliteDatabase.instance = new SqliteDatabase(file);
    }

    return SqliteDatabase.instance;
  }
}

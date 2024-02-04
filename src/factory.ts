import { SqliteDatabase } from '@app/sqlite-database';
import { Database } from '@app/types';
import { config } from '@configs/server';
import { CreatePostAction } from '@modules/posts/actions/create-post-action';
import { DeletePostAction } from '@modules/posts/actions/delete-post-action';
import { ReadPostAction } from '@modules/posts/actions/read-post-action';
import { ReadPostsAction } from '@modules/posts/actions/read-posts-action';
import { UpdatePostAction } from '@modules/posts/actions/update-post-action';
import { PostsController } from '@modules/posts/controllers/posts-controller';
import { drizzle } from 'drizzle-orm/better-sqlite3';

export class Factory {
  public createPostsController(): PostsController {
    return new PostsController(this);
  }

  public createReadPostsAction(): ReadPostsAction {
    return new ReadPostsAction(this.createDatabase());
  }

  public createReadPostAction(): ReadPostAction {
    return new ReadPostAction(this.createDatabase());
  }

  public createCreatePostAction(): CreatePostAction {
    return new CreatePostAction(this.createDatabase());
  }

  public createUpdatePostAction(): UpdatePostAction {
    return new UpdatePostAction(this.createDatabase());
  }

  public createDeletePostAction(): DeletePostAction {
    return new DeletePostAction(this.createDatabase());
  }

  public createDatabase(): Database {
    const sqliteDatabase = SqliteDatabase.getInstance(config.database.url);

    return drizzle(sqliteDatabase);
  }
}

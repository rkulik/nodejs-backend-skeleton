import { config } from '@configs/base';
import { ReadUserAction } from '@modules/auth/actions/read-user-action';
import { RegisterUserAction } from '@modules/auth/actions/register-user-action';
import { RegisteredUsersController } from '@modules/auth/controllers/registered-users-controller';
import { PasswordHandler } from '@modules/auth/password-handler';
import { CreateCommentAction } from '@modules/comments/actions/create-comment-action';
import { DeleteCommentAction } from '@modules/comments/actions/delete-comment-action';
import { ReadCommentAction } from '@modules/comments/actions/read-comment-action';
import { ReadPostCommentsAction } from '@modules/comments/actions/read-post-comments-action';
import { UpdateCommentAction } from '@modules/comments/actions/update-comment-action';
import { CommentsController } from '@modules/comments/controllers/comments-controller';
import { PostCommentsController } from '@modules/comments/controllers/post-comments-controller';
import { CreatePostAction } from '@modules/posts/actions/create-post-action';
import { DeletePostAction } from '@modules/posts/actions/delete-post-action';
import { PublishPostAction } from '@modules/posts/actions/publish-post-action';
import { ReadPostAction } from '@modules/posts/actions/read-post-action';
import { ReadPostsAction } from '@modules/posts/actions/read-posts-action';
import { UnpublishPostAction } from '@modules/posts/actions/unpublish-post-action';
import { UpdatePostAction } from '@modules/posts/actions/update-post-action';
import { PostsController } from '@modules/posts/controllers/posts-controller';
import { PublishedPostsController } from '@modules/posts/controllers/published-posts-controller';
import { SqliteDatabase } from '@src/sqlite-database';
import { Database } from '@src/types';
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
    return new UpdatePostAction(this.createDatabase(), this.createReadPostAction());
  }

  public createDeletePostAction(): DeletePostAction {
    return new DeletePostAction(this.createDatabase());
  }

  public createPublishedPostsController(): PublishedPostsController {
    return new PublishedPostsController(this);
  }

  public createPublishPostAction(): PublishPostAction {
    return new PublishPostAction(this.createDatabase(), this.createReadPostAction());
  }

  public createUnpublishPostAction(): UnpublishPostAction {
    return new UnpublishPostAction(this.createDatabase(), this.createReadPostAction());
  }

  public createCommentsController(): CommentsController {
    return new CommentsController(this);
  }

  public createCreateCommentAction(): CreateCommentAction {
    return new CreateCommentAction(this.createDatabase(), this.createReadPostAction());
  }

  public createReadCommentAction(): ReadCommentAction {
    return new ReadCommentAction(this.createDatabase());
  }

  public createUpdateCommentAction(): UpdateCommentAction {
    return new UpdateCommentAction(this.createDatabase(), this.createReadCommentAction());
  }

  public createDeleteCommentAction(): DeleteCommentAction {
    return new DeleteCommentAction(this.createDatabase());
  }

  public createPostCommentsController(): PostCommentsController {
    return new PostCommentsController(this);
  }

  public createReadPostCommentsAction(): ReadPostCommentsAction {
    return new ReadPostCommentsAction(this.createDatabase(), this.createReadPostAction());
  }

  public createRegisteredUsersController(): RegisteredUsersController {
    return new RegisteredUsersController(this);
  }

  public createReadUserAction(): ReadUserAction {
    return new ReadUserAction(this.createDatabase());
  }

  public createPasswordHandler(): PasswordHandler {
    return new PasswordHandler({ ...config.auth.password });
  }

  public createRegisterUserAction(): RegisterUserAction {
    return new RegisterUserAction(this.createDatabase(), this.createReadUserAction(), this.createPasswordHandler());
  }

  public createDatabase(): Database {
    const sqliteDatabase = SqliteDatabase.getInstance(config.database.url);

    return drizzle(sqliteDatabase);
  }
}

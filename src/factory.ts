import { config } from '@app/configs/base';
import { CreateAccessTokenAction } from '@app/modules/auth/actions/create-access-token-action';
import { ReadUserAction } from '@app/modules/auth/actions/read-user-action';
import { RegisterUserAction } from '@app/modules/auth/actions/register-user-action';
import { AccessTokensController } from '@app/modules/auth/controllers/authentications-controller';
import { RegisteredUsersController } from '@app/modules/auth/controllers/registered-users-controller';
import { JwtHandler } from '@app/modules/auth/handlers/jwt-handler';
import { PasswordHandler } from '@app/modules/auth/handlers/password-handler';
import { CreatePostCommentAction } from '@app/modules/comments/actions/create-post-comment-action';
import { DeleteCommentAction } from '@app/modules/comments/actions/delete-comment-action';
import { ReadCommentAction } from '@app/modules/comments/actions/read-comment-action';
import { ReadPostCommentsAction } from '@app/modules/comments/actions/read-post-comments-action';
import { UpdateCommentAction } from '@app/modules/comments/actions/update-comment-action';
import { CommentsController } from '@app/modules/comments/controllers/comments-controller';
import { PostCommentsController } from '@app/modules/comments/controllers/post-comments-controller';
import { CreatePostAction } from '@app/modules/posts/actions/create-post-action';
import { DeletePostAction } from '@app/modules/posts/actions/delete-post-action';
import { PublishPostAction } from '@app/modules/posts/actions/publish-post-action';
import { ReadPostAction } from '@app/modules/posts/actions/read-post-action';
import { ReadPostsAction } from '@app/modules/posts/actions/read-posts-action';
import { UnpublishPostAction } from '@app/modules/posts/actions/unpublish-post-action';
import { UpdatePostAction } from '@app/modules/posts/actions/update-post-action';
import { PostsController } from '@app/modules/posts/controllers/posts-controller';
import { PublishedPostsController } from '@app/modules/posts/controllers/published-posts-controller';
import { SqliteDatabase } from '@app/sqlite-database';
import type { Database, TokenPayload } from '@app/types';
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

  public createCreatePostCommentAction(): CreatePostCommentAction {
    return new CreatePostCommentAction(this.createDatabase(), this.createReadPostAction());
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

  public createJwtHandler(): JwtHandler<TokenPayload> {
    return new JwtHandler<TokenPayload>({ ...config.auth.token });
  }

  public createAccessTokensController(): AccessTokensController {
    return new AccessTokensController(this);
  }

  public createAccessTokenAction(): CreateAccessTokenAction {
    return new CreateAccessTokenAction(
      this.createReadUserAction(),
      this.createJwtHandler(),
      this.createPasswordHandler(),
    );
  }

  public createDatabase(): Database {
    const sqliteDatabase = SqliteDatabase.getInstance(config.database.url);

    return drizzle(sqliteDatabase);
  }
}

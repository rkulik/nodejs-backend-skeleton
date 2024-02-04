import { Action } from '@app/types';
import { CreatePostDto } from '@modules/posts/dtos';
import { Post } from '@modules/posts/types';

export class CreatePostAction implements Action<Post> {
  public execute(createPostDto: CreatePostDto): Post {
    return {
      id: 3,
      ...createPostDto,
    };
  }
}

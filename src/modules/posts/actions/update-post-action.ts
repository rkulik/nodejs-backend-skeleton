import { Action } from '@app/types';
import { UpdatePostDto } from '@modules/posts/dtos';
import { Post } from '@modules/posts/types';

export class UpdatePostAction implements Action<Post> {
  public execute(post: Post, updatePostDto: UpdatePostDto): Post {
    return {
      ...post,
      ...updatePostDto,
    };
  }
}

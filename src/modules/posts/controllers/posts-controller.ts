import { CreatePostDto, UpdatePostDto } from '@modules/posts/dtos';
import { Post } from '@modules/posts/types';

const posts: Post[] = [
  {
    id: 1,
    title: 'First post',
    content: 'The content of the first post',
  },
  {
    id: 2,
    title: 'Second post',
    content: 'The content of the second post',
  },
];

export class PostsController {
  public read(): Post[] {
    return posts;
  }

  public readOne(id: number): Post | undefined {
    return posts.find((post) => {
      return post.id === id;
    });
  }

  public create(createPostDto: CreatePostDto): Post {
    return {
      id: 3,
      ...createPostDto,
    };
  }

  public update(id: number, updatePostDto: UpdatePostDto): Post | undefined {
    const existingPost = posts.find((post) => {
      return post.id === id;
    });

    return existingPost
      ? {
          ...existingPost,
          ...updatePostDto,
        }
      : undefined;
  }

  public delete(id: number): boolean {
    return posts
      .map((post) => {
        return post.id;
      })
      .includes(id);
  }
}

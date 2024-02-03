import { Post } from '@modules/posts/types';

export type CreatePostDto = Omit<Post, 'id'>;

export type UpdatePostDto = Omit<Post, 'id'>;

import { DrizzlePostRepository } from "./drizzle-post-repository";
import { PostRepository } from "./post-repositorie";

export const postRepository: PostRepository = new DrizzlePostRepository();
